import pageRender from "./pageRender.js";
import display from "./display.js";
import createImageDB from "../services/utils/createImageDB.js";

const welcome = () => {

    // since this app doesn't have a database clearing the localstorage first to avoid issue
    localStorage.clear();

    // Variables

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

    const addUserData = (e) => {
        e.preventDefault();
        createUserData(username.value, email.value, password.value)
        createIsLoggedInData(email.value)
        saveUserData();
        pageRender();
        display();
    
    }

    const render = () => {
        const submit = document.getElementById('signup_form')
        submit.onsubmit = addUserData;
    }

    render();
    createImageDB();
}
export default welcome
