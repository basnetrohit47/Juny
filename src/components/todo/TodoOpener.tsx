import * as React from "react";
import { Button, Popper, Tooltip } from "@mui/material";
import { TodoListContainer } from "./TodoListContainer";
import { getStoreValue, setStoreValue } from "../../utils/localStorageUtil";

export default function TodoOpener() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    const newOpen = !open;
    setOpen(newOpen);
    setStoreValue("todo_open", newOpen);
  };

  const id = open ? "todo-popover" : undefined;
  React.useEffect(() => {
    const checkTodoOpen = async () => {
      const todo_open = await getStoreValue("todo_open");
      if (todo_open) {
        setOpen(true);
      }
    };
    checkTodoOpen();
  }, []);

  return (
    <>
      <div className="p-6 ml-2 ">
        <Tooltip title="Todo list">
          <Button
            className="!text-white !font-semibold !text-[1rem] capitalize"
            aria-describedby={id}
            onClick={handleClick}
            ref={buttonRef}
          >
            Todo
          </Button>
        </Tooltip>
        <Popper id={id} open={open} anchorEl={buttonRef.current}>
          <div className="w-[350px] rounded-md mr-2 bg-[black]">
            <div className="bg-white/10">
              <TodoListContainer />
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
}
