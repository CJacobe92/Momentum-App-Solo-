

const backgroundImageRandomizer = () => {

  // default images
const urls = [
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
] 

const randomIndex = (arr) => {
  const index = Math.floor(Math.random() * arr.length)
  return index 
}

const render = () => {


    const el = document.getElementById('app_container')

    // Load default images if there are no personal images

    const imageIndex = randomIndex(urls)
    el.style.backgroundImage = `url("${urls[imageIndex]}")`
    
    // Make a db connection
  
    const request =  indexedDB.open('ImageDB')

    request.onsuccess = (e) => {

      let db = e.target.result
      loadImage(db);
    }

    request.onerror = (e) => {
      console.log(`An error occured ${e.target.error.message}`)
    }  

    const loadImage = async (db) => {

      const tx = await db.transaction('images', 'readonly')
      const store = await tx.objectStore('images')
      const allImages = await store.getAll();


        allImages.onsuccess = (e) => {
            let data = e.target.result
            const el = document.getElementById('app_container')
          
            try{
              const index = randomIndex(data)
              el.style.backgroundImage = `url("${data[index].image}")`
            }catch(err){
              console.log('No image present')
            }
        }
     }  
}


render();

setTimeout(() => {backgroundImageRandomizer()}, 300000)

}

export default backgroundImageRandomizer;
