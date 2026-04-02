import { CheerioAPI } from 'cheerio';
import * as cheerio from 'cheerio';
import axios from 'axios';




// gets the html structure of the url requested
export async function fetchPage(url: string): Promise<CheerioAPI>{

    const res = await axios.get(url)
    const html = res.data
    const $ = cheerio.load(html)

    return $
}



// export async function fetch
