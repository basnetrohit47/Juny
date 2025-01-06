import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TodoField } from "../../../../schemas/todo.schema";
import { useDeleteTodoItem } from "../../../../queries/todo.query";
import { MoveItem } from "./MoveItem";

interface Props {
  todo: TodoField;
  handleRename: () => void;
}
export default function EditTodoItem({ todo, handleRename }: Props) {
  const { mutate: deleteTodo } = useDeleteTodoItem();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showTodoList, handleShowTodoList] = React.useState<boolean>(false);
  const handleMoveItem = () => {
    handleShowTodoList(true);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    handleClose();
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
        sx={{ padding: "0px", marginLeft: "auto" }}
      >
        <MoreVertIcon />
      </IconButton>

      {showTodoList ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MoveItem todo={todo} handleClose={handleClose} />
        </Menu>
      ) : (
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
          <MenuItem onClick={handleMoveItem}>Move</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
}
