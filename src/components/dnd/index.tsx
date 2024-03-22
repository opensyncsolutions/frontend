import { Grip } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Tooltip from "../ui/tooltip";

interface DnDItem {
  id: string;
  content: ReactNode;
}

interface DnDProps {
  data: DnDItem[];
  onDataReordering: (data: { id: string }[]) => void;
  useDragHandler?: boolean;
  loading?: boolean;
}

// a little function to help us with reordering the result
const reorder = (list: DnDItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const DragAndDropList = ({
  data,
  onDataReordering,
  useDragHandler = true,
  loading,
}: DnDProps) => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    if (data !== items && data && !loading) setItems(data);
  }, [data, loading]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
    onDataReordering(reorderedItems.map((item) => ({ id: item?.id })));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    className="p-3 border bg-white rounded mb-2 flex justify-between items-center"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...(!useDragHandler
                      ? { ...provided.dragHandleProps }
                      : undefined)}
                  >
                    <div className="flex-1">{item.content}</div>
                    {useDragHandler && (
                      <Tooltip content="Grab to drag and drop">
                        <span
                          className="px-2 py-2"
                          {...provided.dragHandleProps}
                        >
                          <Grip size={16} />
                        </span>
                      </Tooltip>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropList;
