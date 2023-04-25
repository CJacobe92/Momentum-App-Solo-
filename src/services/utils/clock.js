const clock = () => {

  
    let userData;

    const getData = () => {
        const loadData = JSON.parse(localStorage.getItem('userData'))
        if(Array.isArray(loadData) && loadData.length > 0){
            return userData = loadData
        }else {
            return userData = []
        }
    }



 getData();
        
    const date = new Date ();
    const hour12Clock = date.toLocaleTimeString('en-US', {hour12:true,hour:'numeric',minute:'numeric'});
    const hour24Clock = date.toLocaleTimeString('en-US', {hour12:false,hour:'numeric',minute:'numeric'});
    

    const time = document.getElementById('clock')
    const toggle = document.getElementById('clock_toggle')
    toggle.checked === false ? time.innerText = hour12Clock.split('PM' || 'AM').join('') : time.innerText = hour24Clock

    userData.map(user => {return toggle.checked = user.h12format})

   
    const toggleTime = (format) => {
        for(let user of userData){
            if(format === true){
                user.h12format = true
            }else if(format === false) {
                user.h12format = false

            }
        }

        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    toggle.addEventListener('change', (e) => {
        toggleTime(e.target.checked)

    })
    
    setTimeout(()=>{clock(), 1000})

    return parseInt(hour24Clock);
    
}

export default clock

