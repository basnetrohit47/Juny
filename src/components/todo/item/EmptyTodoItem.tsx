import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { TodoListField } from "../../../schemas/todo.schema";
import { AddTodoItem } from "./actions/AddTodoItem";
interface Props {
  todoList: TodoListField;
}
export const EmptyList = ({ todoList }: Props) => {
  const [inputShow, setInputShow] = useState<boolean>(false);

  return (
    <div>
      <div className="p-6 m-6 flex flex-col items-center justify-center gap-4">
        <Typography variant="h6" className="!text-white">
          Add a task here
        </Typography>
        {!inputShow && (
          <Button variant="contained" onClick={() => setInputShow(true)}>
            New Task
          </Button>
        )}
      </div>
      {inputShow && <AddTodoItem id={todoList.id} />}
    </div>
  );
};
