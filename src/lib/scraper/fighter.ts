import { CheerioAPI } from "cheerio";
import { fetchPage } from "./utils";



// i need a fetch for the http://ufcstats.com/statistics/fighters?char= ,  this is fighter tale of the tape or details

// gets all the URLs for fighters from A-Z
export function generateAlphabeticalUrlFighter(): string []{
    const listOfAlphabeticalUrls: string [] = [];

    for(let i = 97; i<=122; i++){
        const letter = String.fromCharCode(i)
        listOfAlphabeticalUrls.push(`http://ufcstats.com/statistics/fighters?char=${letter}&page=all`)
    }
    console.log(listOfAlphabeticalUrls)
    return listOfAlphabeticalUrls
}

// gets the fighter basic info: firstname, lastname, nickname, URL
export async function parseFighterDetails(listOfAlphabeticalUrls: string[]): Promise<[string, string, string, string][]>{

    // const allFighterDetails: Fighter [] = []
    const fighterDetail: [string, string, string, string][] = []

    const fighterNames: string[] = []
    const fighterUrls: string[] = []


    for(const url of listOfAlphabeticalUrls){
        const $ = await fetchPage(url)

        $('a.b-link.b-link_style_black').each((_, el) => {
        fighterNames.push($(el).text().trim())
        const href = $(el).attr('href')
        if(href){
            fighterUrls.push(href)
            }
        else{
            fighterUrls.push('')
        }
        }) // [firstname, lastname, nickname] and then [url, url, url] each url will be between the names 
           // = [firstname, url, lastname, url, nickname, url]
    }
    for(let i = 0; i<fighterNames.length; i+=3){
        const firstName = fighterNames[i]
        const lastName = fighterNames[i+1]
        const nickName= fighterNames[i+2]
        const fighterUrl = fighterUrls[i]

        fighterDetail.push([firstName,lastName,nickName,fighterUrl]) // [firstname, lastname, nickname, url]
    }
    return fighterDetail
}

class FighterClass {
  constructor(
    public fighterName: string,
    public fighterRecord: string,
    public fighterHeight: string,
    public fighterWeight: number,
    public fighterReach: number,
    public fighterStance: string,
    public fightDateOfBirth: Date
  ) {}
}

// gets the fighter basic stats: Height, Weight, Reach, Stance, DOB
export async function parseFighterTott(fighterDetails: [string, string, string, string][]): Promise<FighterClass[]>{
    const fighters: FighterClass[] = []

    for(const fighter of fighterDetails){
        const fighterTott: string[] = []
        const url = fighter[3]
        const $ = await fetchPage(url)

        const name = `${fighter[0]} ${fighter[1]}`
        const record = $('span.b-content__title-record').text().trim()
        fighterTott.push(name)
        fighterTott.push(record)

        const tott = $('ul.b-list__box-list').first()
        tott.find('i').each((_,el)=>{
            const label = $(el).text().trim()
            const fullText = $(el).parent().text().trim()
            const value = fullText.replace(label,'').trim()
            fighterTott.push(value)//[name,record,height,weight,reach,stance,dob]
        })
        fighters.push(
            new FighterClass(
                (fighterTott[0]).toString(),
                (fighterTott[1]).toString(),
                (fighterTott[2]).toString(),
                parseInt(fighterTott[3],10),
                parseInt(fighterTott[4],10),
                (fighterTott[5]).toString(),
                new Date(fighterTott[6])
            )
        )
    }
    return fighters
}

