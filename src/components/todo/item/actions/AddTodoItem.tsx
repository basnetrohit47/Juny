import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAddTodoItem } from "../../../../queries/todo.query";

interface Props {
  id: number;
}
export const AddTodoItem = ({ id }: Props) => {
  const { mutate: addTodoItem } = useAddTodoItem();
  const [newTodoItem, setNewTodoItem] = useState<string>("");

  const handleNewTodoItem = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setNewTodoItem(e.target.value);
  };

  const submitNewTodoItem = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addTodoItem({ todolist_id: id, description: newTodoItem });
      setNewTodoItem("");
    }
  };

  return (
    <>
      <TextField
        fullWidth
        type="text"
        value={newTodoItem}
        onChange={handleNewTodoItem}
        onKeyDown={submitNewTodoItem}
        placeholder="New Task"
        className="pl-0"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
    </>
  );
};
