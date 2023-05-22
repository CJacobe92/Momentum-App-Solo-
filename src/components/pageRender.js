
const pageRender = () => {

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


let isLoggedIn;

const getCurrentUser = () => {
    const loadCurrentUser = JSON.parse(localStorage.getItem('isLoggedIn'))
    if(Array.isArray(loadCurrentUser)){
        return isLoggedIn = loadCurrentUser
    }else {
        return isLoggedIn = []
    }
}

getCurrentUser();

const render = () => {
    
    // Handles the showing of the pages

    const loginScreen =   document.getElementById('login_screen')
    const mainScreen = document.getElementById('main_screen')
    const welcomeScreen = document.getElementById('welcome_screen')

       
    if(isLoggedIn.length === 1 && userData.length === 1){
            loginScreen.style.display = "none"
            mainScreen.style.display = "grid"
            welcomeScreen.style.display = "none"
    }
    
    if(isLoggedIn.length === 0 && userData.length === 1){
            loginScreen.style.display = "flex"
            mainScreen.style.display = "none"
            welcomeScreen.style.display = "none"
    }
    
    if(isLoggedIn.length === 0 && userData.length === 0){
            loginScreen.style.display = "none"
            mainScreen.style.display = "none"
            welcomeScreen.style.display = "flex"
    }
}

render();
}

export default pageRender