import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TodoListField } from "../../../../schemas/todo.schema";
import { useDeleteTodoList } from "../../../../queries/todo.query";
import { useTodoStore } from "../../../../store/todo.store";

interface Props {
  todolist: TodoListField;
  handleRename: () => void;
}
export default function EditTodoList({ todolist, handleRename }: Props) {
  const { mutate: deleteTodoList } = useDeleteTodoList();
  const setActiveList = useTodoStore((state) => state.setActiveList);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await deleteTodoList(todolist.id);
    handleClose();
    setActiveList(null);
  };
  const handleEdit = () => {
    handleRename();
    handleClose();
  };

  return (
    <div className="ml-auto">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="ml-auto !p-1"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
