import { create } from "zustand";
import api from "@/lib/api";

export const usePocketStore = create((set, get) => ({
  // --- Original State for Pocket Creation (Unchanged) ---
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

  // --- State for Single Pocket Display (Unchanged) ---
  currentPocket: null,
  isLoading: false,
  error: null,

  // --- State for Transaction History (Unchanged) ---
  transactionHistory: [],
  isHistoryLoading: false,
  historyError: null,

  // --- NEW: State for All Pockets List ---
  allPockets: [],
  isAllPocketsLoading: false,
  allPocketsError: null,

  // --- Actions ---

  // Fetch single pocket by ID (Unchanged)
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

  // Fetch transaction history (Unchanged)
  fetchTransactionHistory: async (monthString) => {
    // ... implementation remains the same
  },

  // --- NEW: Action to fetch all pockets ---
  fetchAllPockets: async () => {
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.get("/pocket");
      if (response.data && response.data.ok) {
        set({
          allPockets: response.data.data || [],
          isAllPocketsLoading: false,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch pockets.");
      }
    } catch (error) {
      console.error("Error fetching all pockets:", error);
      set({
        allPocketsError: error.message || "An unexpected error occurred.",
        isAllPocketsLoading: false,
        allPockets: [],
      });
    }
  },

  // --- NEW: Action to optimistically remove a pocket from the list ---
  removePocketFromList: (pocketId) => {
    set((state) => ({
      allPockets: state.allPockets.filter((p) => p.pocket_id !== pocketId),
    }));
  },
}));
