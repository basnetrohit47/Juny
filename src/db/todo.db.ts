
export const openDatabase = ():Promise<IDBDatabase>=>{
    return new Promise((resolve, reject) => {
        const request: IDBOpenDBRequest = indexedDB.open("TodoListDB", 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('todolist')) {
                const todolistStore = db.createObjectStore('todolist', { keyPath: 'id', autoIncrement: true });
                todolistStore.createIndex('name', 'name', { unique: false });
                todolistStore.createIndex('id', 'id', { unique: false });
                todolistStore.createIndex('created_at', 'created_at', { unique: false });
               
            }
             // Create Todos store
             if (!db.objectStoreNames.contains('todos')) {
                const todoStore = db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
                todoStore.createIndex('todolist_id', 'todolist_id', { unique: false });
                todoStore.createIndex('title', 'title', { unique: false });
                todoStore.createIndex('completed', 'completed', { unique: false });
                todoStore.createIndex('due_date', 'due_date', { unique: false });
                todoStore.createIndex('priority', 'priority', { unique: false });
                todoStore.createIndex('position', 'position', { unique: true });
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

export interface storeProps{
    
    storeName:string,
    
    mode: IDBTransactionMode,
  

}
export const getObjectStore = async (
    {storeName,mode}:storeProps
): Promise<IDBObjectStore> => {
    const db = await openDatabase();
    const transaction = db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
};


