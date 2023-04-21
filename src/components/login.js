import pageRender from "./pageRender.js";
import display from "./display.js";

const login = () => {

    
let userData;

const getData = () => {
    const loadData = JSON.parse(localStorage.getItem('userData'))
    if(Array.isArray(loadData)){
        return userData = loadData
    }else {
        return userData = []
    }
}

const loginInfo = (e) => {
    e.preventDefault();
    
    let currentUser = [{
        currentUser: e.target[0].value
    }]

    userData.map((obj) => {
       if(obj.email === e.target[0].value && obj.password === e.target[1].value){
            localStorage.setItem('isLoggedIn', JSON.stringify(currentUser))
            pageRender();

            return console.log(true)
       }else{
        return console.log(false)
       }
    }) 
}


getData();    

const render = () => {

    const element = document.getElementById('login_form')
    element.onsubmit = loginInfo

}

render();

}

export default login