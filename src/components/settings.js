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

const addImage = () => {
    let db;

    const request = indexedDB.open('Database')

    request.onsuccess = (e) => {
        // console.log('BGImage onsuccess called')
        db = e.target.result
        selectMultiple();
    }

    request.onerror = () => {
        console.log(e.target.error.message)
    }

    const makeTXN = (objectStoreName, mode) => {
        let tx = db.transaction(objectStoreName, mode)
        return tx
    }


    const selectMultiple = () => {
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

                    let tx = makeTXN('images', 'readwrite')
                    let object = tx.objectStore('images')
                    object.add(template) 
                    
                    backgroundImageRandomizer();
                    renderImages();
                    setTimeout(() => {myFile.value = null;  }, 1000)
                    clearTimeout();
                }

            })

        }) 
    }
}

    


const removeImage = (e) => {
    
    let db;
    let id = e.target.id

    const request = indexedDB.open('Database')

    request.onsuccess = (e) => {
        // console.log('BGImage onsuccess called')
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

    renderImages();
    backgroundImageRandomizer();
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

        // Background Image

        
} 


const renderImages = () => {

    let db;
    
    const request = indexedDB.open('Database')

    request.onsuccess = (e) => {
        // console.log('BGImage onsuccess called')
        db = e.target.result
        listImages();
    }

    request.onerror = (e) => {
        console.log(e.target.error.message)
    }

    const makeTXN = (objectStoreName, mode) => {
        let tx = db.transaction(objectStoreName, mode)
        tx.onerror= (e) => {
            console.log(e.target.error.message)
        }
        return tx
    }

    const listImages = async () => {
        let tx = await makeTXN('images', 'readwrite').objectStore('images')
        let data = await tx.getAll();
        
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
                BtnRemoveImg.innerText = 'Remove'
                BtnRemoveImg.id = image.id
                BtnRemoveImg.onclick = removeImage;
                picItems.appendChild(BtnRemoveImg)

            })
        }   

    }
}

render();
// addBackgroundImage();

onload = () => {
renderImages();
addImage();
}

}
export default settings;