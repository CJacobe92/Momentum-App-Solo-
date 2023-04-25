import { formDatas } from "../services/constants/formDatas.js";
import pageRender from "./pageRender.js";
import display from "./display.js"

const welcome = () => {

// Model

let userData;

const getData = () => {
    const loadData = JSON.parse(localStorage.getItem('userData'))
    if(Array.isArray(loadData)){

        return userData = loadData
    }else {
        return userData = []
    }
}

getData();


const createData = (username, email, password) => {
    userData.push({
        username: username,
        email: email,
        password: password,
        h12format: false,
        focus: '',
    })
}

const saveData = (userData, isLoggedIn) => {

    let currentUser = [{
        currentUser: isLoggedIn
    }]

    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', JSON.stringify(currentUser))

    
}

// Controller

const getDetails = () => {

const input_name = document.getElementById('input_name')
const input_email = document.getElementById('input_email')
const input_password = document.getElementById('input_password')

// Get name of the user

input_name.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input_name.value !== ''){
        document.getElementById('form_name').style.display = 'none'
        document.getElementById('form_email').style.display = 'block'

        input_name.style.display = 'none'
        input_email.style.display = 'block'
    }else{
        return
    }
})


//Get email of user
input_email.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input_email.value !== ''){
        document.getElementById('form_email').style.display = 'none'
        document.getElementById('form_password').style.display = 'block'

        input_email.style.display = 'none'
        input_password.style.display = 'block'
    }else {
        return
    }
})


// Get password and create the data based on the model and save the data to local storage

input_password.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input_email.value !== ''){
        document.getElementById('form_password').style.display = 'none'
        
        input_password.style.display = 'none'
        createData(input_name.value, input_email.value, input_password.value)
        saveData(userData, input_email.value)
        pageRender();
        display();
    }else{
        return
    }
})

}


// View

const render = () => {

    formDatas.forEach( formData => {
        const element = document.getElementById('welcome_screen')

        const form = document.createElement('div')
        form.innerText = formData.text;
        form.id = formData.form
        form.style.display = formData.form_display
        element.appendChild(form)

        const input = document.createElement('input')
        input.style.display = formData.input_display
        input.id = formData.input
        input.type = formData.type
        element.appendChild(input)
  
    })

   

}

render();
getDetails();


}
export default welcome
