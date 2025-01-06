import { useState } from "react";
import { TodoField } from "../schemas/todo.schema";


export const useDragAndDrop = (todos: TodoField[], setTodos: (todos: TodoField[]) => void) => {
  const [draggingItemId, setDraggingItemId] = useState<number | null>(null);
  const [lastHoveredItemId, setLastHoveredItemId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, item: TodoField) => {
    setDraggingItemId(item.id);
    const div = e.currentTarget.querySelector("div");
    if (div) div.classList.add("opacity-0");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggingItemId(null);
    const div = e.currentTarget.querySelector("div");
    if (div) div.classList.remove("opacity-0");
  };

  const handleDragOver = (e: React.DragEvent, targetItem: TodoField) => {
    e.preventDefault();

    const targetItemElement = e.currentTarget as HTMLElement;
    if (lastHoveredItemId !== targetItem.id) {
      if (lastHoveredItemId !== null) {
        const lastHoveredItem = document.querySelector(
          `.item[data-id="${lastHoveredItemId}"]`
        ) as HTMLElement;
        if (lastHoveredItem) {
          lastHoveredItem.style.borderTop = "";
          lastHoveredItem.style.borderBottom = "";
        }
      }
      setLastHoveredItemId(targetItem.id);

      const targetRect = targetItemElement.getBoundingClientRect();
      const targetCenter = targetRect.top + targetRect.height / 2;
      if (e.clientY < targetCenter) {
        targetItemElement.style.borderTop = "2px solid blue";
        targetItemElement.style.borderBottom = "";
      } else {
        targetItemElement.style.borderBottom = "2px solid blue";
        targetItemElement.style.borderTop = "";
      }
    }
    handleDrop(e, targetItem);
  };

  const handleDrop = (e: React.DragEvent, targetItem: TodoField) => {
    e.preventDefault();

    const draggingIndex = todos.findIndex((item) => item.id === draggingItemId);
    const targetIndex = todos.findIndex((item) => item.id === targetItem.id);

    if (draggingIndex !== -1 && targetIndex !== -1) {
      const updatedTodos = [...todos];
      const [draggedTodo] = updatedTodos.splice(draggingIndex, 1);
      updatedTodos.splice(targetIndex, 0, draggedTodo);

      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        position: index + 1,
      }));

      setTodos(reorderedTodos);
    }

    const targetItemElement = e.currentTarget as HTMLElement;
    targetItemElement.style.borderTop = "";
    targetItemElement.style.borderBottom = "";
  };

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};
