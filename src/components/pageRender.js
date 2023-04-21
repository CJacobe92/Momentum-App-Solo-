
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

    if(isLoggedIn.length == 0 && userData.length > 0){
        document.getElementById('login_screen').style.display = 'flex'
        document.getElementById('main_screen').style.display = 'none'
        document.getElementById('welcome_screen').style.display = 'none'
    } 
    
    if(isLoggedIn.length > 0 && userData.length > 0){
        document.getElementById('login_screen').style.display = 'none'
        document.getElementById('main_screen').style.display = 'grid'
        document.getElementById('welcome_screen').style.display = 'none'
    }
    
    if(isLoggedIn.length == 0 && userData.length == 0 ){
        document.getElementById('login_screen').style.display = 'none'
        document.getElementById('main_screen').style.display = 'none'
        document.getElementById('welcome_screen').style.display = 'flex'
    }

}

render();

}

export default pageRender