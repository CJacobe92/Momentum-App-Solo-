const clock = () => {

  
    let userData = JSON.parse(localStorage.getItem('userData'))
        
    const date = new Date ();
    const hour12Clock = date.toLocaleTimeString('en-US', {hour12:true,hour:'numeric',minute:'numeric' , second:'numeric'});
    const hour24Clock = date.toLocaleTimeString('en-US', {hour12:false,hour:'numeric',minute:'numeric', second:'numeric'});
    

    const time = document.getElementById('clock')
    const toggle = document.getElementById('clock_toggle')
    toggle.checked === false ? time.innerText = hour12Clock : time.innerText = hour24Clock
    toggle.checked = userData[0].h12format

    const toggleTime = (username, format) => {
        for(let user of userData){
            if(user.username === username){
                user.h12format = format
            }
        }
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    toggle.addEventListener('change', (e) => {
        toggleTime(userData[0].username, e.target.checked)
    })
    
    setTimeout(()=>{clock(), 1000})

    return parseInt(hour24Clock);
    
}

export default clock

