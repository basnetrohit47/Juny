import { Button, List, ListItem, Popover } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetTodoList } from "../../queries/todo.query";
import { TodoList } from "./list/TodoList";
import { TodoListField } from "../../schemas/todo.schema";
import { AddTodoList } from "./list/actions/AddTodoList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditTodoList from "./list/actions/EditTodoList";
import { RenameTodo } from "./list/actions/RenameTodo";
import { useTodoStore } from "../../store/todo.store";
export const TodoListContainer = () => {
  const { data: todoList } = useGetTodoList();
  const { initializeActiveList, setActiveList, activeList } = useTodoStore();
  const [renameTodoList, setRenameTodoList] = useState<boolean>(false);
  const handleListRename = () => {
    setRenameTodoList(true);
  };
  const onFocusOut = () => {
    setRenameTodoList(false);
  };

  const handleTodoListSelection = (todoList: TodoListField) => {
    setActiveList(todoList);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "items-popover" : undefined;
  useEffect(() => {
    initializeActiveList();
  }, []);
  return (
    <>
      <div className="w-full p-4 max-h-[80vh] overflow-y-auto scroll-smooth ">
        <div className="flex">
          {!renameTodoList && (
            <Button
              id="popover-trigger-button"
              aria-describedby={id}
              variant="text"
              onClick={handleClick}
            >
              {activeList?.name ? (
                <div>
                  {activeList?.name}

                  <KeyboardArrowDownIcon />
                </div>
              ) : (
                <div className="flex items-center">Select todo list</div>
              )}
            </Button>
          )}

          {activeList && renameTodoList && (
            <RenameTodo todo={activeList} onFocusOut={onFocusOut} />
          )}

          {activeList && (
            <EditTodoList
              todolist={activeList}
              handleRename={handleListRename}
            />
          )}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <List>
              {todoList?.map((item) => (
                <ListItem
                  key={item.id}
                  component="button"
                  onClick={() => handleTodoListSelection(item)}
                >
                  {item.name}
                </ListItem>
              ))}
              <ListItem>
                <AddTodoList />
              </ListItem>
            </List>
          </Popover>
        </div>
        {activeList && <TodoList todoList={activeList} />}
      </div>
    </>
  );
};
