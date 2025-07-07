import { create } from "zustand";

export const useGlobalStore = create((set, get) => ({
  savColor: "bg-white",
  setSavColor: (color) => set({ savColor: color }),
}));
