
export const openDatabase = ():Promise<IDBDatabase>=>{
    return new Promise((resolve, reject) => {
        const request: IDBOpenDBRequest = indexedDB.open("FavouriteDB", 2);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('favList')) {
                const favListStore = db.createObjectStore('favList', { keyPath: 'id', autoIncrement: true });
                favListStore.createIndex('title', 'title', { unique: false });
                favListStore.createIndex('id', 'id', { unique: false });
                favListStore.createIndex('url', 'url', { unique: false });
                favListStore.createIndex('created_at', 'created_at', { unique: false });
                 // Add initial data to the object store
                 favListStore.transaction.oncomplete = () => {
                    const favListTransaction = db.transaction('favList', 'readwrite');
                    const store = favListTransaction.objectStore('favList');
                    const initialData = [
                        { title: "Netflix", url: "https://www.netflix.com", created_at: new Date().toISOString() },
                        { title: "GPT", url: "https://chat.openai.com", created_at: new Date().toISOString() },
                        { title: "Linkdin", url: "https://www.linkedin.com", created_at: new Date().toISOString() },
                        { title: "Youtube", url: "https://youtube.com", created_at: new Date().toISOString() }
                    ];

                    initialData.forEach(item => store.add(item));
                };

               
            }
             

        };

        request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = (event: Event) => {
            const error = (event.target as IDBOpenDBRequest).error;
            reject(error);
        };
    });
}


export const getFavStore = async (): Promise<IDBObjectStore> => {
    const db = await openDatabase();
    const transaction = db.transaction(["favList"], "readwrite");
    return transaction.objectStore("favList");
};


