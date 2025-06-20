import { create } from "zustand";
import api from "@/lib/api";

export const usePocketStore = create((set, get) => ({
  // --- Original State for Pocket Creation ---
  // This section contains all the state and setters from your original store,
  // used by other modules for the pocket creation process.
  pocketSubject: null,
  setPocketSubject: (subject) => set({ pocketSubject: subject }),

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

  // --- New State for Pocket Display & History ---
  // This section contains your new additions for fetching and displaying
  // pocket data and transaction history.
  currentPocket: null,
  isLoading: false,
  error: null,

  transactionHistory: [],
  isHistoryLoading: false,
  historyError: null,

  // --- Actions for fetching data ---
  fetchPocketById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/pocket/${id}`);
      if (response.data && response.data.ok) {
        set({
          currentPocket: response.data.data,
          isLoading: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch pocket data.",
        );
      }
    } catch (error) {
      console.error("Error fetching pocket detail:", error);
      set({
        error: error.message || "An unexpected error occurred.",
        isLoading: false,
        currentPocket: null,
      });
    }
  },

  fetchTransactionHistory: async (monthString) => {
    const pocketId = get().currentPocket?.id;
    if (!pocketId) {
      console.log("No pocket ID available to fetch history.");
      return;
    }

    set({ isHistoryLoading: true, historyError: null });
    try {
      const response = await api.get(
        `/pocket/${pocketId}/history?month=${monthString}`,
      );
      if (response.data && response.data.ok) {
        set({
          transactionHistory: response.data.data,
          isHistoryLoading: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch transaction history.",
        );
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      set({
        historyError: error.message || "An unexpected error occurred.",
        isHistoryLoading: false,
        transactionHistory: [],
      });
    }
  },
}));
