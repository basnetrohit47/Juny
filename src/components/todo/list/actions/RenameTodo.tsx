import { useEffect, useRef, useState } from "react";
import { TodoListField } from "../../../../schemas/todo.schema";
import { TextField } from "@mui/material";
import { useUpdateTodoList } from "../../../../queries/todo.query";
import { useTodoStore } from "../../../../store/todo.store";
interface Props {
  todo: TodoListField;
  onFocusOut: () => void;
}
export const RenameTodo = ({ todo, onFocusOut }: Props) => {
  const { mutate: updateTodo } = useUpdateTodoList();
  const setActiveList = useTodoStore((state) => state.setActiveList);

  const [editedName, setEditedName] = useState(todo.name); // Local state for description
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };
  const handleSave = () => {
    if (editedName !== todo.name) {
      const updateTodoList = {
        ...todo,
        name: editedName,
      };
      updateTodo(updateTodoList);
      setActiveList(updateTodoList);
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
      value={editedName}
      onChange={(e) => setEditedName(e.target.value)} // Update local state
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      inputRef={inputRef}
      className="p-0"
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
