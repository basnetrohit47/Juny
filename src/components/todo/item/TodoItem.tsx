import { Checkbox, ListItem, Typography } from "@mui/material";
import { TodoField } from "../../../schemas/todo.schema";
import { useUpdateTodoItem } from "../../../queries/todo.query";
import EditTodoItem from "./actions/EditTodoItem";
import { useState } from "react";
import { RenameTodoItem } from "./actions/RenameTodoItem";
interface Props {
  todo: TodoField;
  handleDragStart: (e: React.DragEvent, item: TodoField) => void;
  handleDragEnd: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent, targetItem: TodoField) => void;
  handleDrop: () => void;
}
export const TodoItem = ({
  todo,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
}: Props) => {
  const { mutate: updateTodo } = useUpdateTodoItem();
  const [hovered, setHovered] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const onFocusOut = () => {
    setIsEditing(false);
  };
  const handleRename = () => {
    setIsEditing(true);
  };

  const handleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({
      ...todo,
      completed: event.target.checked,
      completed_at: event.target.checked ? new Date().toISOString() : null,
    });
  };

  return (
    <ListItem
      draggable
      onDragStart={(e) => handleDragStart(e, todo)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => handleDragOver(e, todo)}
      onDrop={handleDrop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="item !p-[5px] mb-1 pr-1 rounded-md"
      data-id={todo.id}
    >
      <div className="flex items-start w-full">
        <div>
          <Checkbox
            checked={todo.completed}
            onChange={handleCompleted}
            size="small"
            className="!p-0 !pr-1 !text-gray-500 hover:bg-transparent"
          />
        </div>
        {isEditing ? (
          <RenameTodoItem todo={todo} onFocusOut={onFocusOut} />
        ) : (
          <Typography
            onDoubleClick={() => setIsEditing(true)}
            variant="body1"
            className={
              todo.completed ? "line-through text-gray-400" : "!text-white"
            }
            autoFocus
          >
            {todo.description}
          </Typography>
        )}
        <div className="w-5 h-4">
          {hovered && <EditTodoItem todo={todo} handleRename={handleRename} />}
        </div>
      </div>
    </ListItem>
  );
};
