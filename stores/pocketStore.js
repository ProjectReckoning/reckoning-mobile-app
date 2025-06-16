import { create } from "zustand";

export const usePocketStore = create((set) => ({
  pocketType: null,
  setPocketType: (type) => set({ pocketType: type }),

  goalTitle: null,
  setGoalTitle: (title) => set({ goalTitle: title }),
}));
