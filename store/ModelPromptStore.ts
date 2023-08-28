import { create } from "zustand";

interface ModelState {
  isPromptOpen: boolean;
  openModelPrompt: () => void;
  closeModelPrompt: () => void;
  deleteInfo: {
    todo: Todo | null;
    index: number;
    id: typedColumn | string;
  };
  setDeleteInfo: (todo: Todo, index: number, id: typedColumn) => void;
}

export const useModelPromptStore = create<ModelState>()((set) => ({
  isPromptOpen: false,
  openModelPrompt: () => set({ isPromptOpen: true }),
  closeModelPrompt: () => set({ isPromptOpen: false }),
  deleteInfo: {
    todo: null,
    index: 0,
    id: "",
  },
  setDeleteInfo: (todo, index, id) =>
    set({
      deleteInfo: {
        todo: todo,
        index: index,
        id: id,
      },
    }),
}));
