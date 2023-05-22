import display from "./display.js";
import backgroundImageRandomizer from "../services/utils/backgroundRandomizer.js";
import pageRender from "./pageRender.js";

const settings = () => {

let userData;


const getData = () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if(Array.isArray(data)){
        return userData =  data
    }else {
        return userData = []
    }
}

getData();



// Profile

const username = document.getElementById('form_prof_username')
const email = document.getElementById('form_prof_email')
const password=  document.getElementById('form_prof_password')

const editProfile = (e) => {
    e.preventDefault()
    username.disabled = false;
    email.disabled = false;
    password.disabled = false;

}

const saveData = () => {
    updateUserName();
    updateUserEmail();
    updateUserPassword();
    display();

    username.disabled = true;
    email.disabled = true;
    password.disabled = true;
}

const updateUserName = () => {

    const username = document.getElementById('form_prof_username')

    userData.map((el) => {
        el.username = username.value
    })

    localStorage.setItem('userData', JSON.stringify(userData))
}

const updateUserEmail = () => {

    const email = document.getElementById('form_prof_email')

    userData.map((el) => {
        el.email = email.value
    })

    localStorage.setItem('userData', JSON.stringify(userData))
}

const updateUserPassword = () => {

    const password=  document.getElementById('form_prof_password')

    userData.map((el) => {
        el.password = password.value
    })

    localStorage.setItem('userData', JSON.stringify(userData))
}

// Add Background Images

const addImage = () => {

    const request = indexedDB.open('ImageDB')

    request.onsuccess = () => {
        let db = request.result
        selectMultiple(db);
    }

    request.onerror = () => {
        console.log(e.target.error.message)
    }

    const selectMultiple = (db) => {
        const myFile = document.getElementById('myFile')
        myFile.addEventListener('change', (e) => {
            const document = e.target.files

            Object.keys(document).map(item => {
                const file = document[item]
                const reader = new FileReader();
                reader.readAsDataURL(file)

                reader.onloadend = () => {

                    let template = {
                        name: file.name,
                        image: reader.result
                    }

                    let tx = db.transaction('images', 'readwrite')
                    let object = tx.objectStore('images')
                    object.add(template) 
                    
                    backgroundImageRandomizer();
                    render();
                    setTimeout(() => {myFile.value = null;  }, 1500)
                    clearTimeout();
                }

            })

        }) 
    }
}

    
const removeImage = (e) => {
    
    let db;
    let id = e.target.id

    const request = indexedDB.open('ImageDB')

    request.onsuccess = (e) => {
        db = e.target.result
        deleteImage();
    }

    request.onerror = () => {
        console.log(e.target.error.message)
    }

    const makeTXN = (objectStoreName, mode) => {
        let tx = db.transaction(objectStoreName, mode)
        tx.onerror= (e) => {
            console.log(e.target.error.message)
        }
        return tx
    }
    
    const deleteImage = () => {
        let tx = makeTXN ('images', 'readwrite')
        let objectStore =  tx.objectStore('images')
        objectStore.delete(parseInt(id))
        
    }

    render();
    backgroundImageRandomizer();
}


// Quotes
let quotesData;

const getQuotesData = () => {
    const loadData = JSON.parse(localStorage.getItem('quotes'))
    if(Array.isArray(loadData)){
        return quotesData = loadData
    }else{
        return quotesData = []
    }
}

getQuotesData();

const saveQuotes = () => {
    localStorage.setItem('quotes', JSON.stringify(quotesData))
}

const deleteQuotes = (id) => {
    quotesData = quotesData.filter((item)=> {
        if(item.id === parseInt(id) && item.remove === true){
            return false
        }else{
            return true
        }
       
    })

}

const removeQuotes = (e) => {
    const id = e.target.id
    deleteQuotes(id)
    saveQuotes()
    render();
}


const createQuotes = (quote, author) => {
    const id = Math.floor(Math.random() * 100)
    quotesData.push({
        id: id,
        quote: quote,
        author: author,
        remove: true
    })
}

const addQuotes = () => {
    const author = document.getElementById('quoteAuthor')
    const quoteText = document.getElementById('quoteText')
    createQuotes(quoteText.value, author.value)
    saveQuotes();
    render();

    quoteText.value = ""
    author.value = ""
}

// Option

const selectOption = (e) => {
   const selectItem = e.target.id
   const profile = document.getElementById('opt_profile')
   const background = document.getElementById('opt_background')
   const quote = document.getElementById('opt_quote')

   if(selectItem === 'profile'){
    profile.style.display = 'block'
    background.style.display = 'none'
    quote.style.display = 'none'
   }
   
   if(selectItem === 'background'){
    profile.style.display = 'none'
    background.style.display = 'block'
    quote.style.display = 'none'
   }
   

   if(selectItem === 'quote'){
    profile.style.display = 'none'
    background.style.display = 'none'
    quote.style.display = 'block'
   }

   render();

}


// Open/Close button 

const openForm = () => {
    document.getElementById('settings_form_popup').style.display = "flex"
}

const closeForm = () => {
    document.getElementById('settings_form_popup').style.display = "none"

}


const deleteMyData = () => {
    localStorage.clear();
    indexedDB.deleteDatabase('ImageDB')
    pageRender();
}

const render = () => {

        const open_btn = document.getElementById('settings_open_btn')
        open_btn.onclick = openForm;

        const close_btn = document.getElementById('settings_close_btn')
        close_btn.onclick = closeForm;

        document.getElementById('profile_form').addEventListener('submit', (e)=> {
            e.preventDefault();
            saveData();
        })
        

        const li = Array.from(document.getElementsByClassName('set_selection'))

        li.forEach(el => {
            el.onclick = selectOption
        })

         // Profile Data

         userData.map((el) => {
            const username = document.getElementById('form_prof_username')
            const email = document.getElementById('form_prof_email')
            const password=  document.getElementById('form_prof_password')
            const editProfileBtn = document.getElementById('editProfileBtn')

            username.value = el.username
            email.value = el.email
            password.value = el.password

            editProfileBtn.onclick = editProfile;
        })

       
        //Quotes
        const element = document.getElementById('quotesDisplay')
        element.innerHTML = ''

        quotesData.slice(0).reverse().map(quote => {
            const quoteDiv = document.createElement('div')
            quoteDiv.id = 'quoteDiv'
            element.appendChild(quoteDiv)

            const quoteItem = document.createElement('p')
            const string = quote.quote
            const length = 80
            const trimmedString = string.substring(0, length)
            quoteItem.innerText = `${trimmedString}...`
            quoteDiv.appendChild(quoteItem)

            const btnDeleteQuote = document.createElement('button')
            btnDeleteQuote.innerHTML = '&times;'
            btnDeleteQuote.classList = 'btnDeleteQuote'
            btnDeleteQuote.id = quote.id
            btnDeleteQuote.onclick = removeQuotes;
            quoteDiv.appendChild(btnDeleteQuote)

            const btnQuoteAdd = document.getElementById('btnQuoteAdd')
            btnQuoteAdd.onclick = addQuotes;
        })

        const renderImages = () => {

            const request = indexedDB.open('ImageDB')
    
            request.onsuccess = () => {
                let db = request.result
                listImages(db)
            }
    
            request.onerror = () => {
                console.log(request.result.error.message)
            }
    
       
            const listImages =  async (db) => {
                let tx = await db.transaction('images', 'readwrite')
                let object = await tx.objectStore("images")
                let data = await object.getAll();
                
                data.onsuccess = () => {
                    const images = data.result
    
                    document.getElementById('listImages').innerHTML = ""
    
                    images.map(image => {
                        const element = document.getElementById('listImages')
                        const picItems = document.createElement('div')
                        picItems.id = 'picItems'
                        element.appendChild(picItems)
    
                        const picture = document.createElement('div')
                        const string = image.name
                        const length = 20
                        const trimmedString = string.substring(0, length)
                        picture.innerText = trimmedString
                        picItems.appendChild(picture)
    
                        // Delete the images
                        
                        const BtnRemoveImg = document.createElement('button')
                        BtnRemoveImg.innerHTML = '&times;'
                        BtnRemoveImg.classList = 'BtnRemoveImg'
                        BtnRemoveImg.id = image.id
                        BtnRemoveImg.onclick = removeImage;
                        picItems.appendChild(BtnRemoveImg)
    
                    })
                }   
    
            }
           
    }
    renderImages();  

            // Delete Data
            const deleteData = document.getElementById('btnRemoveData')
            deleteData.onclick = deleteMyData;
} 



render();
addImage();


}
export default settings;