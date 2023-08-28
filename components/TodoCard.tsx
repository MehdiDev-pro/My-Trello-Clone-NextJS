"use client";
import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { useModelPromptStore } from "@/store/ModelPromptStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: typedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [openModelPrompt, setDeleteInfo] = useModelPromptStore((state) => [state.openModelPrompt, state.setDeleteInfo]);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);

  const handleDeleteTask = () => {
    openModelPrompt();
    setDeleteInfo(todo, index, id);
  };

  return (
    <div className="bg-white rounded-md space-y-2 drop-shadow-md" {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button onClick={handleDeleteTask} className="text-red-500 hover:text-red-600" title="delete todo" type="button">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {imageUrl && (
        <div className="relative h-full w-full rounded-b-md">
          <Image priority className="w-full object-contain rounded-b-md" src={imageUrl} width={400} height={200} alt="Task Image" />
        </div>
      )}
    </div>
  );
}
