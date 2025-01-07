import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TodoField } from "../../../../schemas/todo.schema";
import {
  useDeleteTodoItem,
  useUpdateTodoItem,
} from "../../../../queries/todo.query";
import { MoveItem } from "./MoveItem";
import FlagIcon from "@mui/icons-material/Flag";
interface Props {
  todo: TodoField;
  handleRename: () => void;
}
export default function EditTodoItem({ todo, handleRename }: Props) {
  const { mutate: deleteTodo } = useDeleteTodoItem();
  const { mutate: updateTodo } = useUpdateTodoItem();
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
  const handlePriority = (priority: number) => {
    const updatedTodo: TodoField = {
      id: todo.id,
      todolist_id: todo.todolist_id,
      priority,
    };

    updateTodo(updatedTodo);
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
          <MenuItem>
            <div>
              <Typography>Priority</Typography>
              <div className="flex">
                <IconButton onClick={() => handlePriority(1)}>
                  <FlagIcon className="text-red-500" />
                </IconButton>
                <IconButton onClick={() => handlePriority(2)}>
                  <FlagIcon className="text-orange-500" />
                </IconButton>
                <IconButton onClick={() => handlePriority(3)}>
                  <FlagIcon className="text-blue-500" />
                </IconButton>
                <IconButton onClick={() => handlePriority(4)}>
                  <FlagIcon className="text-gray-100" />
                </IconButton>
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
}
