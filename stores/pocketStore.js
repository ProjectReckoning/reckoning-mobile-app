import { create } from "zustand";

export const usePocketStore = create((set) => ({
  pocketType: null,
  setPocketType: (type) => set({ pocketType: type }),

  goalTitle: null,
  setGoalTitle: (title) => set({ goalTitle: title }),

  pocketName: "",
  setPocketName: (name) => set({ pocketName: name }),

  pocketBalanceTarget: null,
  setPocketBalanceTarget: (balance) =>
    set({
      pocketBalanceTarget:
        typeof balance === "string"
          ? parseInt(balance.replace(/\D/g, ""), 10) || 0
          : balance,
    }),

  targetDuration: { startDate: undefined, endDate: undefined },
  setTargetDuration: (duration) => set({ targetDuration: duration }),

  selectedFriends: [],
  setSelectedFriends: (friends) => set({ selectedFriends: friends }),

  pocketColor: "bg-orange-wondr",
  setPocketColor: (color) => set({ pocketColor: color }),

  pocketIcon: "Pocket",
  setPocketIcon: (icon) => set({ pocketIcon: icon }),
}));
