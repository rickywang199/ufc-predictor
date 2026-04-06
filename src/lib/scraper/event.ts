import { CheerioAPI } from "cheerio";
import { fetchPage } from "./utils";


const url = "http://ufcstats.com/statistics/events/completed?page=all"

interface EventDetails{
    name: string
    url: string
    date: Date
    location: string
}

// gets the basic event details
export async function parseEventDetails(url: string): Promise<EventDetails[]>{

    const eventNames: string[] = []
    const eventUrls: string[] = []
    const eventLocations: string[] = []
    const eventDates: Date[] = []
    const events: EventDetails[] = []


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
        events.push({
            name: eventNames[i],
            url: eventUrls[i],
            date: slicedEventDates[i],
            location: slicedEventLocation[i],
        })
    }
    return events
}