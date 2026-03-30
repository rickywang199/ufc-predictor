export function generateAlphabeticalUrlFighter(): string []{
    const listOfAlphabeticalUrls: string [] = [];

    for(let i = 97; i<=122; i++){
        const letter = String.fromCharCode(i)
        listOfAlphabeticalUrls.push(`http://ufcstats.com/statistics/fighters?char=${letter}&page=all`)
    }
    // console.log(list_of_alphabetical_urls)
    return listOfAlphabeticalUrls
}