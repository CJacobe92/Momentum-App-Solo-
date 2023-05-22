const quotes = () => {

    const quotesData = [

        {
            id: 1,
            quote: "Ask, and it shall be given you; seek, and you shall find.",
            author: "the Bible" ,
            remove: false

        },
        {
            id: 2,
            quote: "Eighty percent of success is showing up.",
            author: "Woody Allen",
            remove: false
 
        },
        {
            id: 3,
            quote: "If at first you don’t succeed, try, try again.",
            author: "W. E. Hickson" ,
            remove: false

        },
        {
            id: 4,
            quote: "No one can make you feel inferior without your consent.",
            author: "Eleanor Roosevelt" ,
            remove: false

        },
        {
            id: 5,
            quote: "Not all those who wander are lost.",
            author: "J. R. R. Tolkein" ,
            remove: false
        },
        
    ]

    let quotesArr;

    const getData = () => {
        const loadData = JSON.parse(localStorage.getItem('quotes'))
        if(Array.isArray(loadData)){
            return quotesArr = loadData
        }else{
            return quotesArr = []
        }
    }

    getData()

    const storeDefaultQuotes = (value) => {
        localStorage.setItem('quotes', JSON.stringify(value))
    }

    const randomIndex = (arr) => {
        const index = Math.floor(Math.random() * arr.length)
        return index 
      }

    const render = () => {
        const title = document.getElementById('quotes_title')
        const author = document.getElementById('quotes_author')

        if(quotesArr.length > 0 ){
            const index = randomIndex(quotesArr)
            title.innerText = `"${quotesArr[index].quote}"`
            author.innerText = `- ${quotesArr[index].author}`
        }else{
            const index = randomIndex(quotesData)
            title.innerText = `"${quotesData[index].quote}"`
            author.innerText = `- ${quotesData[index].author}`
        }

        if(quotesArr.length < 4){
            storeDefaultQuotes(quotesData)
        }
        
    }
   

    render();
   
    setTimeout(() => {quotes();}, 300000)
}

export default quotes;