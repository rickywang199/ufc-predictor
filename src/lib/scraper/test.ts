import { fetchPage } from "./utils";
import { generateAlphabeticalUrlFighter, parseFighterDetails,parseFighterTott } from "./fighter";



// tests if fetchPage returns the html
// fetchPage('http://ufcstats.com/statistics/events/completed').then($ => console.log($.html()))

// console.log(generateAlphabeticalUrlFighter())



async function main(){
    const results = await parseFighterDetails(['http://ufcstats.com/statistics/fighters?char=a&page=all'])
    console.log(results.slice(0, 10)) // just show first 5 fighters
    const temp = await parseFighterTott(results.splice(0,10))
    console.log(temp)
}

main()