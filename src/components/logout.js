import pageRender from "./pageRender.js"
import login from "./login.js"

const logout = () => {


const signOff = () => {
    window.localStorage.removeItem('isLoggedIn')
    window.localStorage.removeItem('todos')
    login();
    pageRender();
  
}

const render = () => {
    
    const element = document.getElementById('logout')
    const logoutBtn = document.createElement('button')
    logoutBtn.innerText = 'Sign Off'
    logoutBtn.onclick = signOff
    element.appendChild(logoutBtn)
}

render();

}

export default logout