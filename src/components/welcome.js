import pageRender from "./pageRender.js";
import display from "./display.js";
import imageDB from "../services/utils/imageDB.js";

const welcome = () => {


    // Variables
    const fg_username = document.getElementById('form__group_username');
    const fg_email = document.getElementById('form__group_email');
    const fg_password = document.getElementById('form__group_password');
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

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


    const createUserData = (username, email, password) => {
        userData.push({
            username: username,
            email: email,
            password: password,   
        })
    }

    const createIsLoggedInData = (email) => {
        localStorage.setItem('isLoggedIn', JSON.stringify([{email}]))
    }
    
    
    const saveUserData = () => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    // Controller

    const addUserData = (username, email, password) => {
        createUserData(username, email, password)
        createIsLoggedInData(email)
        saveUserData();
        pageRender();
        display();
    }

    const render = () => {
        
   

        username.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && username.value !== ''){
                fg_username.style.display = 'none'
                fg_email.style.display = 'flex'
            }
        })

        email.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && email.value !== ''){
                fg_email.style.display = 'none'
                fg_password.style.display = 'flex'
            }
        })

        password.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && password.value !== ''){
                fg_password.style.display = 'none'
                addUserData(username.value, email.value, password.value)
            }
        })
        
        
    }

    render();


}
export default welcome
