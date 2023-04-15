import clock from "../services/utils/clock.js"

const display = () => {   

let userData;

    const getData = () => {
        const loadData = JSON.parse(localStorage.getItem('userData'))
        if(Array.isArray(loadData) && loadData.length > 0){
            document.getElementById('welcome_screen').style.display = 'none'
            document.getElementById('main').style.display = 'block'
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
const username  =  userData.map(user => {return user.username})
const focus = userData.map(user => {return user.focus}).flat().toString();

console.log(focus)

// hide text when input is empty

    if(focus !== ''){
        focus_text.innerHTML = focus
        show_focus.style.display = 'flex'
        focus_input.style.display = 'none'
    }else{
        show_focus.style.display = 'none'
        focus_input.style.display = 'block'
    }
    

    if(clock() === 24 || clock() < 12){
    
        greetElement.innerText = `Good morning, ${username}`
    }else if(clock() >= 12 || clock() < 18){
      
        greetElement.innerText = `Good afternoon, ${username}`
        
    }else if(clock() >= 18 || clock() < 23){
    
        greetElement.innerText= `Good evening, ${username}`
       
    }
   
// Function to update your focus

const updateFocus = (focus) => {
    return userData.map((user) => {
        user.focus = focus
        localStorage.setItem('userData', JSON.stringify(userData))
    }
)}  


// hide the focus input and show the user's current focus

focus_input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        updateFocus(userData[0].username, focus_input.value)
        show_focus.style.display = "flex"
        focus_input.style.display = "none"
        display();
    }
})

// delete user's focus and show the focus input

del_focus.addEventListener('click', () => {
    updateFocus(focus)
    show_focus.style.display = "none"
    focus_input.style.display = "block"
})

}

export default display