import clock from "../services/utils/clock.js"

const display = () => {   

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

let focusData;

const getFocusData = () => {
    const loadFocusData = JSON.parse(localStorage.getItem('focusData'))
    if(Array.isArray(loadFocusData) && loadFocusData.length > -1){
        return focusData = loadFocusData
    }else {
        return focusData = []
    }
}

getFocusData();

const createFocus = (focus) => {

    const id = Math.floor(Math.random() * 1000)

    focusData.push({
        focus: focus,
        id: id
    })
}

const saveFocus = (focusData) => {
    localStorage.setItem('focusData', JSON.stringify(focusData))
}

const removeFocus = (focusId) => {
    const focusIndex = focusData.findIndex(obj => obj.id === focusId)

    return focusIndex > -1 ? focusData.splice(focusIndex, 1) : focusData
}

// Controller

const addFocus = () => {
    const focus_input = document.getElementById('focus_input')

    if(focus_input.value !== '' ){
        createFocus(focus_input.value)
        saveFocus(focusData)
        render();
    }else {
        console.log('Please enter a text')
    }
}

const deleteFocus = (e) => {
    removeFocus(parseInt(e.target.id))
    saveFocus(focusData)
    document.getElementById('focus_text').style.display = 'none'
    document.getElementById('focus_input').style.display = 'block'

}

document.getElementById('focus_input').addEventListener('keydown', (e) => {
    return e.key === 'Enter' ? addFocus() : false
})

// View

const render = () => {  

    // Render the clock
    userData.map((obj) => {

        const greet_element = document.getElementById('greet_element')
    
        if(clock() === 24 || clock() < 12){
            greet_element.innerText = `Good morning, ${obj.username}`
        }
    
        if(clock() >= 12 && clock() <= 17){
            greet_element.innerText = `Good afternoon, ${obj.username}`
        }
    
        if(clock() >= 18 && clock() <= 23){
            greet_element.innerText = `Good evening, ${obj.username}`
        }
    })

    // Render the focus display
    focusData.map((obj) => {
        const focus_text = document.getElementById('focus_text')
        const focus_input = document.getElementById('focus_input')
       
        focus_text.innerText = obj.focus
        focus_text.style.display = 'block'
        focus_input.style.display = 'none'

        const delBtn = document.createElement('button')
        delBtn.innerText = 'Delete'
        delBtn.id = obj.id
        delBtn.onclick = deleteFocus
        focus_text.appendChild(delBtn)
    })
}

render();

}   

export default display