import { create } from "zustand";
import { TodoListField } from "../schemas/todo.schema";
import { getStoreValue, setStoreValue } from "../utils/localStorageUtil";

interface TodoStore {
  activeList: TodoListField | null;
  setActiveList: (todoList: TodoListField | null) => void;
  initializeActiveList: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  activeList: null,

  initializeActiveList: async () => {
    try {
      const cachedActiveList = await getStoreValue<TodoListField | null>("todo_list");
      set({ activeList: cachedActiveList || null });
    } catch (error) {
      console.error("Error initializing active list from storage:", error);
    }
  },

  setActiveList: (todoList: TodoListField | null) => {
    set({ activeList: todoList });
    try {
      setStoreValue("todo_list", todoList);
    } catch (error) {
      console.error("Error saving active list to storage:", error);
    }
  },
}));
