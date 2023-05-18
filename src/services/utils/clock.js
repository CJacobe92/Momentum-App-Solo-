const clock = () => {


    let timeFormat;

    const getData = () => {
        const loadData = JSON.parse(localStorage.getItem('24hr'))
            if(typeof loadData === 'boolean'){
                return timeFormat = loadData
            }else{
                return timeFormat = true
            }
        
    }

    getData();

    const date = new Date ();
    const hour12Clock = date.toLocaleTimeString('en-US', {hour12:true,hour:'numeric',minute:'numeric'});
    const hour24Clock = date.toLocaleTimeString('en-US', {hour12:false,hour:'numeric',minute:'numeric'});
  
    const toggleClock = () => {
        if(timeFormat === true){
            localStorage.setItem('24hr', JSON.stringify(false))
        }else if(timeFormat === false){
            localStorage.setItem('24hr', JSON.stringify(true))
        }
    }

    const render = () => {
        const time = document.getElementById('clock')
        const toggle = document.getElementById('clock_toggle')
        toggle.checked = timeFormat
        toggle.onclick = toggleClock
        
        toggle.checked === false ? time.innerText = hour12Clock.split('PM' && 'AM').join('') : time.innerText = hour24Clock
    }



 render();  
 
 setTimeout(()=>{clock(), 1000})
 return parseInt(hour24Clock)
    
}

export default clock

