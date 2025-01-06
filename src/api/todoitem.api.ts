import { CreateTodoField, TodoField } from "../schemas/todo.schema";
import { getObjectStore } from "../db/todo.db";


 // Retrieve the maximum position from the database
 const maxPosition = (store:IDBObjectStore):Promise<number>=>{
    return new Promise<number>((resolve, reject) => {
        const request = store.index("position").openCursor(null, "prev"); // Assuming 'position' is an index
        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
                resolve(cursor.value.position); // The highest position
            } else {
                resolve(0); // If no items exist, start at position 0
            }
        };
    
        request.onerror = (event: Event) => {
            const error = (event.target as IDBRequest).error;
            console.error("Error fetching max position:", error);
            reject(error);
        };
    });
 }

export const addTodoItems = async (newTodoList: CreateTodoField): Promise<void> => {
    const store = await getObjectStore({
        storeName:"todos",
        mode: "readwrite",
    
    });
    const max = await maxPosition(store);
    const todoWithDate: CreateTodoField = {
        ...newTodoList,
        completed: newTodoList.completed ?? false,  // Set false if not provided
        priority: newTodoList.priority ?? 3, 
        created_at: new Date().toISOString(),
        completed_at:newTodoList.completed_at??null,
        position: max + 1, // Add to the end


    };
  
    const request = store.add(todoWithDate);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            console.log("Todo list added successfully!");
            resolve();
        };

        request.onerror = (event: Event) => {
            const error = (event.target as IDBRequest).error;
            console.error("Error adding todo list:", error);
            reject(error);
        };
    });
};

export const getTodosByList=async (todolistId:number):Promise<TodoField[]> =>{
    const store = await getObjectStore({
        storeName:"todos",
        mode: "readwrite",
    
    });
    const index = store.index('todolist_id');


    return new Promise((resolve, reject) => {
        const request = index.getAll(todolistId);

        request.onsuccess = () => {
            // Sort todos by priority and due date
            const todos = request.result.sort((a, b) => {
                if (a.position !== b.position) {
                    return a.position - b.position;
                }
               
                return 0;
            });
            resolve(todos);
        };
                request.onerror = () => reject(request.error);
    });


}

export const updateTodo = async (todo:TodoField)=>{
    const store = await getObjectStore({
        storeName:"todos",
        mode: "readwrite",
    
    });

    return new Promise((resolve, reject) => {
        const request = store.put(todo);
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// export const deleteTodo = async(id:number)=>{
//     const store = await getObjectStore({
//         storeName:"todos",
//         mode:"readwrite"
//     });

//     return new Promise((resolve,reject)=>{
//         const request = store.delete(id);
//         request.onsuccess = () => resolve(request.result);
//         request.onerror = () => reject(request.error);
//     })
    
// }
export const deleteTodo = async (id: number): Promise<void> => {
    const store = await getObjectStore({
        storeName: "todos",
        mode: "readwrite",
    });

    const getTodoRequest = store.get(id);

    return new Promise((resolve, reject) => {
        getTodoRequest.onsuccess = async () => {
            const deletedItem = getTodoRequest.result;

            if (!deletedItem) {
                reject(new Error("Todo item not found."));
                return;
            }

            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = async () => {
                console.log(`Deleted item with id: ${id}`);

                // Reorder positions
                const cursorRequest = store.index("position").openCursor();

                cursorRequest.onsuccess = (event: Event) => {
                    const cursor = (event.target as IDBRequest).result;

                    if (cursor) {
                        const item = cursor.value;

                        if (item.position > deletedItem.position) {
                            // Decrement position for items with higher positions
                            item.position -= 1;
                            const updateRequest = store.put(item);

                            updateRequest.onsuccess = () => {
                                console.log(`Updated position for item with id: ${item.id}`);
                            };

                            updateRequest.onerror = (updateEvent: Event) => {
                                console.error(
                                    `Error updating position for item with id: ${item.id}`,
                                    (updateEvent.target as IDBRequest).error
                                );
                            };
                        }

                        cursor.continue(); // Move to the next item
                    } else {
                        resolve(); // Reordering completed
                    }
                };

                cursorRequest.onerror = (cursorEvent: Event) => {
                    reject((cursorEvent.target as IDBRequest).error);
                };
            };

            deleteRequest.onerror = () => {
                reject(deleteRequest.error);
            };
        };

        getTodoRequest.onerror = () => {
            reject(getTodoRequest.error);
        };
    });
};



export const saveTodos = async (todos: TodoField[]) => {
   console.log(todos)
      const store = await getObjectStore({
        storeName:"todos",
        mode:"readwrite"
    });
    const transaction = store.transaction; // Get the transaction from the store

    store.clear();

    // Prepare promises for batch inserts
    const insertPromises = todos.map((todo) => {
      return new Promise((resolve, reject) => {
        const request = store.put(todo);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    });
  
    await Promise.all(insertPromises);
  
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve("Todos saved successfully!");
      transaction.onerror = () => reject(transaction.error);
    });


  };
  