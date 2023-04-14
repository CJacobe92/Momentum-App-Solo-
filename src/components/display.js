import clock from "../services/utils/clock.js"

const display = () => {   

let userData;

    const getData = () => {
        const loadData = JSON.parse(localStorage.getItem('userData'))
        if(Array.isArray(loadData) && loadData.length > 0){
            document.getElementById('welcome_screen').style.display = 'none'
            document.getElementById('main').style.display = ''
            return userData = loadData
        }else {
            return userData = []
        }
    }
    
getData();    


// HTML Elements

const greetElement = document.getElementById('greet_element')
const focus_input = document.getElementById('focus_input')
const focus_text= document.getElementById('focus_text')
const show_focus = document.getElementById('show_focus')
const del_focus = document.getElementById('del_focus')

// hide text when input is empty

    
    if(userData[0].focus !== ''){
        focus_text.innerText = userData[0].focus
        show_focus.style.display = 'block'
        focus_input.style.display = 'none'
    }else{
        show_focus.style.display = 'none'
        focus_input.style.display = 'block'
    }

    if(clock() === 24 || clock() < 12){
    
        greetElement.innerText = `Good morning, ${userData[0].username}`
    }else if(clock() >= 12 || clock() < 18){
      
        greetElement.innerText = `Good afternoon, ${userData[0].username}`
        
    }else if(clock() >= 18 || clock() < 23){
    
        greetElement.innerText= `Good evening, ${userData[0].username}`
       
    }
   
// Function to update your focus

const updateFocus = (username, focus) => {
    userData.map((user) => {
        if(username === user.username){
            user.focus = focus
        }
        localStorage.setItem('userData', JSON.stringify(userData))
    }
)}  


// hide the focus input and show the user's current focus

focus_input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        updateFocus(userData[0].username, focus_input.value)
        show_focus.style.display = "block"
        focus_input.style.display = "none"
        display();
    }
})

// delete user's focus and show the focus input

del_focus.addEventListener('click', () => {
    updateFocus(userData[0].username, '')
    show_focus.style.display = "none"
    focus_input.style.display = "block"
})

}

export default display