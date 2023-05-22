const imageDB = () => {
    let db;

    const request = indexedDB.open('Database', 2)
    
    request.onupgradeneeded = (e) => {
        console.log('onupgradeneeded is called')


        db = e.target.result
        
        if(!db.objectStoreNames.contains('images')){
            const store = db.createObjectStore('images', {keyPath: 'id', autoIncrement: true})

            // Indexes
            store.createIndex('id', 'id', {unique: true})
            store.createIndex('name', 'name', {unique: true})
            store.createIndex('image', 'image', {unique: true})
            

        }

        console.log(db)
        
    } 

    request.onsuccess = (e) => {
        // console.log('imageDB onsuccess called')
        db = e.target.result

    }

    request.onerror = () => {
        console.log(e.target.error.message)
    }

    

}

export default imageDB