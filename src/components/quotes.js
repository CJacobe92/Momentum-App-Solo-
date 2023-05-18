const quotes = () => {

    const quotesData = [
        {
            quote: "A rose by any other name would smell as sweet.	",
            author: "William Shakespeare" 
        },
        {
            quote: "All that glitters is not gold.",
            author: "William Shakespeare" 
        },
        {
            quote: "All the world’s a stage, and all the men and women merely players.",
            author: "William Shakespeare" 
        },
        {
            quote: "Ask, and it shall be given you; seek, and you shall find.",
            author: "the Bible" 
        },
        {
            quote: "Eighty percent of success is showing up.",
            author: "Woody Allen" 
        },
        {
            quote: "For those to whom much is given, much is required.",
            author: "the Bible" 
        },
        {
            quote: "Genius is one percent inspiration and ninety-nine percent perspiration",
            author: "Thomas Edison" 
        },
        {
            quote: "If at first you don’t succeed, try, try again.",
            author: "W. E. Hickson" 
        },
        {
            quote: "Keep your friends close, but your enemies closer.",
            author: "Michael Corleone" 
        },
        {
            quote: "No one can make you feel inferior without your consent.",
            author: "Eleanor Roosevelt" 
        },
        {
            quote: "Not all those who wander are lost.",
            author: "J. R. R. Tolkein" 
        },
        
    ]

    const randomIndex = () => {
        const index = Math.floor(Math.random() * quotesData.length)
        return index 
      }

    const render = () => {
        const quotesIndex = randomIndex()
        const title = document.getElementById('quotes_title')
        const author = document.getElementById('quotes_author')


        title.innerText = `"${quotesData[quotesIndex].quote}"`
        author.innerText = `- ${quotesData[quotesIndex].author}`

    }
   

    render();
    
    setTimeout(() => {quotes();}, 10000)
}

export default quotes;