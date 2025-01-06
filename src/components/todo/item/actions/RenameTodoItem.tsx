import { useEffect, useRef, useState } from "react";
import { TodoField } from "../../../../schemas/todo.schema";
import { TextField } from "@mui/material";
import { useUpdateTodoItem } from "../../../../queries/todo.query";
interface Props {
  todo: TodoField;
  onFocusOut: () => void;
}
export const RenameTodoItem = ({ todo, onFocusOut }: Props) => {
  const { mutate: updateTodo } = useUpdateTodoItem();

  const [editedDescription, setEditedDescription] = useState(todo.description); // Local state for description
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };
  const handleSave = () => {
    if (editedDescription !== todo.description) {
      updateTodo({
        ...todo,
        description: editedDescription,
      });
    }
    onFocusOut();
  };
  useEffect(() => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length); // Place the cursor at the end
      inputRef.current.focus();
    }
  }, []);

  return (
    <TextField
      fullWidth
      value={editedDescription}
      onChange={(e) => setEditedDescription(e.target.value)} // Update local state
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      inputRef={inputRef}
      className="!p-0"
      sx={{
        "& .MuiOutlinedInput-input": {
          padding: "0px",
          color: "#ffffffad",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiInputBase-root": {
          padding: "0px", // Remove padding from the input container
        },
      }}
    />
  );
};
