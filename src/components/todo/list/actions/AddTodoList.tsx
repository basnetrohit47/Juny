import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useAddTodoList } from "../../../../queries/todo.query";

export const AddTodoList = () => {
  const { mutate: addTodoList } = useAddTodoList();

  const [newTodoList, setNewTodoList] = useState<string>("");

  const handleNewTodoList = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setNewTodoList(e.target.value);
  };

  const submitNewTodoList = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await addTodoList({ name: newTodoList });
      setNewTodoList("");
    }
  };

  return (
    <>
      <TextField
        value={newTodoList}
        onChange={handleNewTodoList}
        onKeyDown={submitNewTodoList}
        placeholder="+ Add List"
        type="text"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
    </>
  );
};
