import { ReactNode, useEffect, useState } from "react";
import { Grip } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Tooltip from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface SubItem {
  id: string;
  canDrag?: boolean;
  content: ReactNode;
}

export interface NestedDnDItem {
  id: string;
  content: ReactNode;
  sortOrder: number;
  canDrag?: boolean;
  noDataMessage?: string;
  subItems: SubItem[];
}

const reorder = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const NestedDragAndDrop = ({
  data,
  onDataReordering,
  loading,
}: {
  data: NestedDnDItem[];
  onDataReordering: (
    data: { id: string; subItems: { id: string }[] }[]
  ) => void;
  loading?: boolean;
}) => {
  const [items, setItems] = useState<NestedDnDItem[]>(data);
  useEffect(() => {
    if (data !== items && data && !loading) setItems(data);
  }, [data, loading]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      const newItems = reorder(items, sourceIndex, destIndex);
      setItems(newItems);
      onDataReordering(
        newItems.map((item) => ({
          id: item?.id,
          subItems: item?.subItems?.map((item) => ({
            id: item?.id,
          })),
        }))
      );
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap: { [key: string]: SubItem[] } = items.reduce(
        (acc: { [key: string]: SubItem[] }, item) => {
          acc[item.id] = item.subItems;
          return acc;
        },
        {}
      );

      const sourceParentId = result.source.droppableId;
      const destParentId = result.destination.droppableId;

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...items];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
          sourceSubItems,
          sourceIndex,
          destIndex
        );
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        setItems(newItems);
        onDataReordering(
          newItems.map((item) => ({
            id: item?.id,
            subItems: item?.subItems?.map((item) => ({
              id: item?.id,
            })),
          }))
        );
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        setItems(newItems);
        onDataReordering(
          newItems.map((item) => ({
            id: item?.id,
            subItems: item?.subItems?.map((item) => ({
              id: item?.id,
            })),
          }))
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        type="droppableItem"
        direction="horizontal"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex w-full flex-wrap gap-4"
          >
            {items?.filter((item) => !item?.canDrag)?.length ? (
              <ul
                className={cn(
                  "w-full space-y-4",
                  items?.filter((item) => item?.canDrag)?.length
                    ? "md:w-[calc(50%-8px)]"
                    : ""
                )}
              >
                {items
                  ?.filter((item) => !item?.canDrag)
                  .map((item) => {
                    return (
                      <li
                        className="border rounded w-full h-full flex-1"
                        key={item?.id}
                      >
                        <div className="flex border-b gap-3 p-3 max-h-[60px] h-[60px] justify-between gap-3 items-center">
                          {item.content}
                        </div>
                        <Droppable
                          droppableId={item.id}
                          type={`droppableSubItem`}
                          direction="vertical"
                        >
                          {(provided) => (
                            <ul
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="flex flex-col h-full p-3"
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <Draggable
                                  key={subItem.id}
                                  draggableId={subItem.id}
                                  index={subIndex}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="p-2 mb-2 items-center border bg-white rounded flex justify-between w-full"
                                    >
                                      {subItem.content}
                                      {subItem?.canDrag && (
                                        <Tooltip content="Grab to drag and drop">
                                          <span
                                            className="px-2 py-2"
                                            {...(!loading
                                              ? { ...provided.dragHandleProps }
                                              : {})}
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
                      </li>
                    );
                  })}
              </ul>
            ) : null}
            {items?.filter((item) => item?.canDrag)?.length ? (
              <ul
                className={cn(
                  " w-full space-y-4",
                  items?.filter((item) => !item?.canDrag)?.length
                    ? "md:w-[calc(50%-8px)]"
                    : ""
                )}
              >
                {items
                  ?.filter((item) => item?.canDrag)
                  .map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border rounded w-full flex flex-col bg-white"
                          >
                            <div className="flex gap-2 border-b p-3 max-h-[60px] min-h-[60px] justify-between items-center">
                              {item.content}
                              <Tooltip content="Grab to drag and drop">
                                <span
                                  className="px-2 py-2"
                                  {...(!loading
                                    ? { ...provided.dragHandleProps }
                                    : {})}
                                >
                                  <Grip size={16} />
                                </span>
                              </Tooltip>
                            </div>
                            <Droppable
                              droppableId={item.id}
                              type={`droppableSubItem`}
                              direction="vertical"
                            >
                              {(provided) => (
                                <ul
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="flex flex-col gap-2 p-3 h-full"
                                >
                                  {!item?.subItems?.length && (
                                    <li className="text-sm">
                                      {item?.noDataMessage || "No Data Found"}
                                    </li>
                                  )}
                                  {item.subItems.map((subItem, subIndex) => (
                                    <Draggable
                                      key={subItem.id}
                                      draggableId={subItem.id}
                                      index={subIndex}
                                    >
                                      {(provided) => (
                                        <li
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          className="p-2 items-center border bg-white rounded flex justify-between w-full"
                                        >
                                          {subItem.content}
                                          <Tooltip content="Grab to drag and drop">
                                            <span
                                              className="px-2 py-2"
                                              {...(!loading
                                                ? {
                                                    ...provided.dragHandleProps,
                                                  }
                                                : {})}
                                            >
                                              <Grip size={16} />
                                            </span>
                                          </Tooltip>
                                        </li>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </ul>
                              )}
                            </Droppable>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
              </ul>
            ) : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NestedDragAndDrop;
