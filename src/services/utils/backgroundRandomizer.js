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

//load personal images from IndexeDB


const randomIndex = (arr) => {
  const index = Math.floor(Math.random() * arr.length)
  return index 
}

const render =  () => {

  let db;

   const request = indexedDB.open('Database')

  request.onsuccess = (e) => {
    // console.log('Database loaded successfully')

    db = e.target.result
    loadImage();
  }

  request.onerror = (e) => {
    console.log(`An error occured ${e.target.error.message}`)
  }

  // const makeTX = async (storeName, mode) => {
  //   let tx = await db.transaction(storeName, mode)
  //   tx.onerror = (e) => {
  //     console.log(e.target.error.message)
  //   }
  //   return tx
  // }

  const loadImage = async () => {
      const tx = await db.transaction('images', 'readonly')
      const store = await tx.objectStore('images')
      const allImages = await store.getAll();
      const element = document.getElementById('app_container')
      allImages.onsuccess = (e) => {
         let images = e.target.result

         if(images.length > 0){
          const index = randomIndex(images)
          element.style.backgroundImage = `url("${images[index].image}")`    

         }else{
          const imageIndex = randomIndex(urls)
          const element = document.getElementById('app_container')
          element.style.backgroundImage = `url("${urls[imageIndex]}")`
         }
      }
  }
    

  
}

render();

setTimeout(() => {backgroundImageRandomizer()}, 300000)

}

export default backgroundImageRandomizer;
