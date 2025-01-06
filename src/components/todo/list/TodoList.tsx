import { List, ListItem } from "@mui/material";
import { TodoField, TodoListField } from "../../../schemas/todo.schema";
import { useGetTodoItems } from "../../../queries/todo.query";
import { TodoItem } from "../item/TodoItem";
import { AddTodoItem } from "../item/actions/AddTodoItem";
import { EmptyList } from "../item/EmptyTodoItem";
import { useEffect, useState } from "react";
import { saveTodos } from "../../../api/todoitem.api";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
interface Props {
  todoList: TodoListField;
}
export const TodoList = ({ todoList }: Props) => {
  const [todos, setTodos] = useState<TodoField[]>([]);
  const { data: todoListItems } = useGetTodoItems(todoList.id);
  useEffect(() => {
    if (todoListItems) {
      setTodos(todoListItems);
    }
  }, [todoListItems]);

  const { handleDragStart, handleDragEnd, handleDragOver } = useDragAndDrop(
    todos,
    setTodos
  );

  const handleSave = () => {
    saveTodos(todos);
  };

  return (
    <>
      {todos?.length ? (
        <>
          <div>
            <List>
              {todos.map((item: TodoField) => (
                <TodoItem
                  todo={item}
                  key={item.id}
                  handleDragStart={handleDragStart}
                  handleDragEnd={handleDragEnd}
                  handleDragOver={handleDragOver}
                  handleDrop={handleSave}
                />
              ))}
              <ListItem sx={{ paddingLeft: "0px" }}>
                <AddTodoItem id={todoList.id} />
              </ListItem>
            </List>
          </div>
        </>
      ) : (
        <EmptyList todoList={todoList} />
      )}
    </>
  );
};
