import { useState, SyntheticEvent } from "react";

export function useDragAndDrop() {
  const [dragOver, setDragOver] = useState(false);
  const [fileDropError, setFileDropError] = useState("");

  const onDragOver = (e: SyntheticEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  
  return {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  };
}
