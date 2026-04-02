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

type Fighter = {
    fighterName: string;
    fighterRecord: string;
    fighterHeight: string;
    fighterWeight: number; // lbs
    fighterReach: number; //inches
    fighterStance: string;
    fightDateOfBirth: Date;
}

export async function parseFighterDetails(listOfAlphabeticalUrls: string[]): Promise<[string, string, string, string][]>{

    // const allFighterDetails: Fighter [] = []
    const fighterDetail: [string, string, string, string][] = []

    const fighterNames: string[] = []
    const fighterLinks: string[] = []


    for(const url of listOfAlphabeticalUrls){
        const $ = await fetchPage(url)

        $('a.b-link.b-link_style_black').each((_, el) => {
        fighterNames.push($(el).text().trim())
        const href = $(el).attr('href')
        if(href){
            fighterLinks.push(href)
            }
        else{
            fighterLinks.push('')
        }
        }) // [firstname, lastname, nickname] and then [url, url, url] each url will be between the names 
           // = [firstname, url, lastname, url, nickname, url]
    }

    for(let i = 0; i<fighterNames.length; i+=3){
        const firstName = fighterNames[i]
        const lastName = fighterNames[i+1]
        const nickName= fighterNames[i+2]
        const fighterUrl = fighterLinks[i]

        fighterDetail.push([firstName,lastName,nickName,fighterUrl])
    }
    return fighterDetail
}