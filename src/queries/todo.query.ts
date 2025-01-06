import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodoList, deleteTodoList, getTodoList, updateTodoList } from "../api/todolist.api"
import { addTodoItems, deleteTodo, getTodosByList, updateTodo } from "../api/todoitem.api"
import { getStoreValue, setStoreValue } from "../utils/localStorageUtil"
import { TodoListField } from "../schemas/todo.schema"


export const useGetTodoList = ()=>{
   return useQuery({
        queryKey:['todoList'],
        queryFn:getTodoList,
        retry: 2, 
        staleTime: 6000000, // Data stays fresh for 5 minutes
    })
}
export const useGetTodoItems = (id:number)=>{
    return useQuery({
        queryKey:['todos',id],
        queryFn:()=>getTodosByList(id)
    })
}


export const useAddTodoList = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:addTodoList,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['todoList']
            })
        }
    })
}

export const useAddTodoItem = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addTodoItems,
        onSuccess:()=>{
             queryClient.invalidateQueries({
                queryKey:['todos']
             })
        }
    })
}

export const useUpdateTodoItem = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:updateTodo,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['todos']
            })
        }
    })
}

export const useDeleteTodoItem = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteTodo,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['todos']
            })
        }

    })
}

export const useUpdateTodoList = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:updateTodoList,
        onSuccess:async(todoList:TodoListField)=>{

            try{
                await queryClient.invalidateQueries({
                    queryKey:['todoList']
                })
                const cachedList = await getStoreValue("todo_list") as TodoListField;
           if(todoList.id === cachedList.id){
                setStoreValue("todo_list",todoList);
           }
            }
            catch(err){
                console.error("Error updating the cached todo list:", err);

            }
            
           

        }

    })
}


export const useDeleteTodoList = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteTodoList,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['todoList']
            })
        }

    })
}