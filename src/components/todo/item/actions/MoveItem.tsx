import { MenuItem } from "@mui/material";
import { TodoField } from "../../../../schemas/todo.schema";
import {
  useGetTodoList,
  useUpdateTodoItem,
} from "../../../../queries/todo.query";
interface Props {
  todo: TodoField;
  handleClose: () => void;
}
export const MoveItem = ({ todo, handleClose }: Props) => {
  const { data: todoList } = useGetTodoList();
  const { mutate: updateTodo } = useUpdateTodoItem();
  const handleMove = async (todo_list_id: number) => {
    await updateTodo({ ...todo, todolist_id: todo_list_id });
    handleClose();
  };
  return (
    <>
      {todoList?.map((item) => (
        <MenuItem onClick={() => handleMove(item.id)}>{item.name}</MenuItem>
      ))}
    </>
  );
};
