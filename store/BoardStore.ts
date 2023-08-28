import { ID, databases, storage } from "@/appwrite";
import Column from "@/components/Column";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

interface BoardStore {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: typedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: typedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: typedColumn;
  setNewTaskType: (columnId: typedColumn) => void;
  image: File | null;
  setImage: (image: File | null ) => void
  addTask :(todo: string, columnId: typedColumn, image?: File | null) => void
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: {
    columns: new Map<typedColumn, Column>(),
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },
  deleteTask: async (taskIndex: number, todo: Todo, id: typedColumn) => {
    const newColumns = new Map(get().board.columns);

    // delete todo from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id);
  },
  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  newTaskType: "todo",
  setNewTaskType: (columnId: typedColumn) => set({ newTaskType: columnId }),
  image: null,
  setImage: (image: File | null ) => set({image}),
  addTask: async (todo: string, columnId: typedColumn, image?: File | null) => {
    let file: Image | undefined

    if(image){
      const fileUpload = await uploadImage(image)
      if(fileUpload){
        file = {
          bucketId: fileUpload.bucketId,
          fileId: fileUpload.$id
        }
      }
    }
    const { $id } = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, ID.unique(),
      {
        title: todo,
        status: columnId,
        // include image if existed
        ...(file && {image: JSON.stringify(file)})
      }
    )
    set({newTaskInput: ""})
    set((state) => {
      const newColumns = new Map(state.board.columns)

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo, 
        status: columnId,
        // include image if existed 
        ...(file && {image: file})
      }
      const column = newColumns.get(columnId)
      if(!column){
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        })
      }else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }
      return {
        board: {
          columns: newColumns
        }
      }
    })
  }
}));
