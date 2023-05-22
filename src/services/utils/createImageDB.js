const createImageDB = () => {

    const request = indexedDB.open('ImageDB', 2)

    request.onerror = () => {
        console.log(request.error.message)
     }
     
     request.onsuccess = () => {
        let db = request.result
        console.log(`Onsuccess event called. Database: "${db.name}" exist loading database...`)
     }
    
    request.onupgradeneeded = () => {
      
        let db = request.result

        if(!db.objectStoreNames.contains('images')){
            const store = db.createObjectStore('images', {keyPath: 'id', autoIncrement: true})

            // Indexes
            store.createIndex('id', 'id', {unique: true})
            store.createIndex('name', 'name', {unique: true})
            store.createIndex('image', 'image', {unique: true})
            

        }

        console.log('Database does not exist...')
        console.log('Onupgradedneeded event called. Database creation successful...')
    } 
    
   
    
}

export default createImageDB