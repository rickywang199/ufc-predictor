import { fetchPage } from "./utils";


const url = "http://ufcstats.com/statistics/events/completed?page=all"

interface EventDetail{
    eventName: string
    eventUrl: string
    date: Date
    location: string
    fightDetails: FightDetail []
}
interface FightDetail {
    fightName: string
    fightUrl: string
}

// interface FullFightCardDetail{
//     eventName:string
//     eventUrl: string
//     date: Date
//     location: string
//     fightDetails: FightDetail []
// }


// gets the basic event details
export async function parseEventDetails(url: string): Promise<EventDetail[]>{

    const eventNames: string[] = []
    const eventUrls: string[] = []
    const eventLocations: string[] = []
    const eventDates: Date[] = []
    const events: EventDetail[] = []


    const $ = await fetchPage(url)

    //gets event name and url
    $('a.b-link.b-link_style_black').each((_,el) => {
        eventNames.push($(el).text().trim())
        const href = $(el).attr('href')
        if(href){
            eventUrls.push(href)
        }
        else{
            eventUrls.push('')
        }
    })
    //gets event dates
    $('span.b-statistics__date').each((_,el) => {
        eventDates.push(new Date($(el).text().trim()))
    })

    $('td.b-statistics__table-col.b-statistics__table-col_style_big-top-padding').each((_,el) => {
        eventLocations.push($(el).text().trim())
    })
    const slicedEventDates = eventDates.slice(1)
    const slicedEventLocation = eventLocations.slice(1)

    for(let i = 0; i < eventNames.length; i++){
        console.log(`Doing event: ${eventNames[i]}`)
        const fightCardDetails = await parseFightDetails(eventUrls[i])
        events.push({
            eventName: eventNames[i],
            eventUrl: eventUrls[i],
            date: slicedEventDates[i],
            location: slicedEventLocation[i],
            fightDetails: fightCardDetails,
        })
        // console.log(JSON.stringify(events, null, 2))
    }
    return events
}

//implement getting fight details, this will pull details for single event, gets URL and who vs who
export async function parseFightDetails(url: string): Promise<FightDetail []> {
    const fightUrls: string[] = []

    const $ = await fetchPage(url)

    const fightRows = $('tr.b-fight-details__table-row.b-fight-details__table-row__hover.js-fight-details-click').toArray()

    $('tr.b-fight-details__table-row.b-fight-details__table-row__hover.js-fight-details-click').each((_,el) => {
        const dataLink = $(el).attr('data-link')
        if (dataLink){
            fightUrls.push(dataLink)
        }
        else{
            fightUrls.push('')
        }
    })
    const fightsInEvent: string[] = []


    for (const fightUrl of fightUrls){
        let temp = 0
        //gets individuals fights in each event
        const $ = await fetchPage(fightUrl)

        const fighterName: string [] = []
        $('hr.b-content__title').each((_,el) => {
            const eventName = $(el).text().trim() 
        })

        $('a.b-link.b-fight-details__person-link').each((_,el) => {
            fighterName.push($(el).text().trim())
        })
        fightsInEvent.push(`${fighterName[0]} vs. ${fighterName[1]}`)
    }

    const fightDetails: FightDetail [] = []

    for( let i = 0; i < fightUrls.length; i++){
        fightDetails.push({
            fightName: fightsInEvent[i],
            fightUrl: fightUrls[i]
        })
    }
    return fightDetails
}