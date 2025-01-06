import { z } from "zod";
export const todoSchema = z.object({
    todolist_id:z.number(),
    id:z.number().readonly(),
    title:z.string().optional(),
    description:z.string().optional(),
    created_at:z.string().readonly().optional(),
    completed_at:z.string().optional().nullable(),  // Add completed_at field
    completed:z.boolean().default(false).optional(),
    priority:z.number().default(3).optional(),
    position:z.number().optional()
})
export const createTodoSchema = todoSchema.omit({ id: true }); // id is omitted

export type CreateTodoField = z.infer< typeof createTodoSchema>

export type TodoField = z.infer< typeof todoSchema>






export const todoListSchema = z.object({
    id:z.number().readonly(),
    name:z.string(),
    description:z.string().optional(),
    created_at:z.string().readonly().optional(),
    todos:z.array(todoSchema),
})
export const createTodoListSchema = todoListSchema.omit({ id: true,todos:true }); // id is omitted

export type TodoListField = z.infer< typeof todoListSchema>

export type CreateTodoListField = z.infer< typeof createTodoListSchema>

