import display from "./display.js";
import backgroundImageRandomizer from "../services/utils/backgroundRandomizer.js";

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

const editProfile = () => {

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

// Background Images


const addBackgroundImage = () => {

    let db;

    const request = indexedDB.open('Database', 1)

    request.onsuccess = (e) => {
        console.log('BGImage onsuccess called')
        db = e.target.result
        addImage();
    }

    request.onerror = () => {
        console.log(e.target.error.message)
    }

    request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded is called')


        db = e.target.result
        
        // if(!db.objectStoreNames.contains('images')){
            const store = db.createObjectStore('images', {keyPath: 'id', autoIncrement: true})

            // Indexes
            store.createIndex('id', 'id', {unique: true})
            store.createIndex('image', 'image', {unique: false})
        // }
        
    } 

    const myTXN = (objectStoreName, mode) => {
        let tx = db.transaction(objectStoreName, mode)
        tx.onerror= (e) => {
            console.log(e.target.error.message)
        }
        return tx
    }
    
    const addImage = () => {
        let myFile = document.getElementById('myFile')
        myFile.addEventListener('change', (e) => {
            const files = e.target.files
    
            Object.keys(files).map( i => {
                const file = files[i]
                const reader = new FileReader();
                reader.readAsDataURL(file)
                
                reader.addEventListener('load', () => {
                    document.getElementById('btnAddImg').addEventListener('click', () => {
                        let tx = myTXN('images', 'readwrite')
                        let store = tx.objectStore('images')
                        let item = {
                            image: reader.result
                        }
                        store.add(item)
                        document.getElementById('myFile').value = ""
                        backgroundImageRandomizer();
                        
                    })
                    
                })
                })
        })
    }
}


// Option

const selectOption = (e) => {
   const selectItem = e.target.id
   const profile = document.getElementById('opt_profile')
   const background = document.getElementById('opt_background')
   const color = document.getElementById('opt_color')
   const quote = document.getElementById('opt_quote')

   if(selectItem === 'profile'){
    profile.style.display = 'block'
    background.style.display = 'none'
    color.style.display = 'none'
    quote.style.display = 'none'
   }
   
   if(selectItem === 'background'){
    profile.style.display = 'none'
    background.style.display = 'block'
    color.style.display = 'none'
    quote.style.display = 'none'
   }
   
   if(selectItem === 'color'){
    profile.style.display = 'none'
    background.style.display = 'none'
    color.style.display = 'block'
    quote.style.display = 'none'
   }
   
   if(selectItem === 'quote'){
    profile.style.display = 'none'
    background.style.display = 'none'
    color.style.display = 'none'
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


   const render = () => {

        const open_btn = document.getElementById('settings_open_btn')
        open_btn.onclick = openForm;

        const close_btn = document.getElementById('settings_close_btn')
        close_btn.onclick = closeForm;

        document.getElementById('saveProfileBtn').addEventListener('click', (e)=> {
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


        
   } 

addBackgroundImage();
render();

}
export default settings;