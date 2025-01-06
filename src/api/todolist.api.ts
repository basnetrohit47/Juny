import { CreateTodoListField, TodoListField } from "../schemas/todo.schema";
import { getObjectStore } from "../db/todo.db";



export const addTodoList = async (newTodoList: CreateTodoListField): Promise<void> => {
    const store = await getObjectStore({
        storeName:"todolist",
        mode: "readwrite",
    
    });


    const todoWithDate: CreateTodoListField = {
        ...newTodoList,
        created_at: new Date().toISOString(),
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

export const getTodoList =async ():Promise<TodoListField[]>=>{
    const store = await getObjectStore( {
      
        storeName:"todolist",
        mode: "readwrite",
    
    });

    const request: IDBRequest<TodoListField[]> = store.getAll();


    return new Promise((resolve,reject)=>{
        request.onsuccess = ()=>{
            
            resolve(request.result)
        }
        request.onerror = (event:Event)=>{
            const error = (event.target as IDBRequest).error;
            reject(error)
        }
    
    })
}

export const getTodoItems =async (id:number):Promise<TodoListField>=>{
    const store = await getObjectStore( {
        storeName:"todos",
        mode: "readwrite",
    
    });
    const request:IDBRequest<TodoListField> = store.get(id)

    return new Promise((resolve,reject)=>{
        request.onsuccess = ()=>{
            resolve(request.result)
        }
        request.onerror = (event:Event)=>{
            const error = (event.target as IDBRequest).error;
            reject(error)
        }
    
    })
}

export const updateTodoList = async (todolist:TodoListField):Promise<TodoListField>=>{
    const store = await getObjectStore( {
      
        storeName:"todolist",
        mode: "readwrite",
    
    });
    return new Promise((resolve,reject)=>{
        const request= store.put(todolist);
        request.onsuccess = () => resolve(todolist);
        request.onerror = () => reject(request.error);
    })

}

export const deleteTodoList = async(id:number):Promise<void>=>{
    const store = await getObjectStore({
        storeName:"todolist",
        mode:"readwrite"
    });

    return new Promise((resolve,reject)=>{
        const request = store.delete(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
    
}


