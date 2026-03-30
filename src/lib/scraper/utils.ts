import { CheerioAPI } from 'cheerio';
import * as cheerio from 'cheerio';
import axios from 'axios';

// i need a fetch for the http://ufcstats.com/statistics/fighters?char= ,  this is fighter tale of the tape or details
// i need a fetch for event details for the date
// i need a fetch for fight result
// i need a fetch for fight stats


// gets the html structure of the url requested
export async function fetchPage(url: string): Promise<CheerioAPI>{

    const res = await axios.get(url)
    const html = res.data
    const $ = cheerio.load(html)

    return $
}


export function generateAlphabeticalUrlFighter(): string []{
    const listOfAlphabeticalUrls: string [] = [];

    for(let i = 97; i<=122; i++){
        const letter = String.fromCharCode(i)
        listOfAlphabeticalUrls.push(`http://ufcstats.com/statistics/fighters?char=${letter}&page=all`)
    }
    // console.log(list_of_alphabetical_urls)
    return listOfAlphabeticalUrls
}

// export async function fetch
