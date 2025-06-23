import { create } from "zustand";
import api from "@/lib/api";

// Helper map to convert Tailwind color classes to HEX codes
const colorClassToHex = {
  "bg-orange-wondr": "#FF7A00",
  "bg-yellow-wondr": "#FFC700",
  "bg-lime-wondr": "#A8E05F",
  "bg-tosca-wondr": "#58ABA1",
  "bg-purple-wondr": "#8A2BE2",
  "bg-pink-wondr": "#FF69B4",
};

export const usePocketStore = create((set, get) => ({
  // --- State for Pocket Creation ---
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
  isCreating: false,
  createError: null,

  // --- State for Single Pocket Display ---
  currentPocket: null,
  isLoading: false,
  error: null,

  // --- State for Transaction History ---
  transactionHistory: [],
  isHistoryLoading: false,
  historyError: null,

  // --- State for All Pockets List ---
  allPockets: [],
  isAllPocketsLoading: false,
  allPocketsError: null,

  // --- Actions ---

  createPocket: async () => {
    set({ isCreating: true, createError: null });
    const {
      pocketName,
      pocketType,
      pocketBalanceTarget,
      targetDuration,
      pocketIcon,
      pocketColor,
      selectedFriends,
    } = get();

    const typeMapping = {
      Spending: "spending",
      Saving: "saving",
      "Business Fund": "saving",
    };

    const requestBody = {
      name: pocketName,
      type: typeMapping[pocketType] || "spending",
      status: "active",
      icon_name: pocketIcon,
      color_hex: colorClassToHex[pocketColor] || "#FF7A00",
      members: selectedFriends.map((friend) => ({
        user_id: friend.id,
        role: "viewer",
      })),
    };

    if (pocketType === "Saving" || pocketType === "Business Fund") {
      requestBody.target_nominal = pocketBalanceTarget;
      requestBody.deadline = targetDuration?.endDate
        ? new Date(targetDuration.endDate).toISOString()
        : null;
    }

    try {
      const response = await api.post("/pocket", requestBody);
      if (response.data && response.data.ok) {
        set({ isCreating: false });
        get().fetchAllPockets();
        return response.data.data;
      } else {
        throw new Error(
          response.data?.message ||
            "Pocket creation failed, response was not OK.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ createError: errorMessage, isCreating: false });
      throw error;
    }
  },

  resetPocketData: () => {
    set({
      pocketSubject: null,
      pocketType: null,
      goalTitle: null,
      pocketName: "",
      pocketBalanceTarget: null,
      targetDuration: { startDate: undefined, endDate: undefined },
      selectedFriends: [],
      pocketColor: "bg-orange-wondr",
      pocketIcon: "Pocket",
      isCreating: false,
      createError: null,
    });
  },

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
    if (!pocketId) return;

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

  /**
   * Removes a pocket from the local list (used for optimistic updates).
   * @param {string | number} pocketId
   */
  removePocketFromList: (pocketId) => {
    set((state) => ({
      allPockets: state.allPockets.filter((p) => p.pocket_id !== pocketId),
    }));
  },

  /**
   * --- NEW: Deletes a pocket from the server and removes it from local state. ---
   * @param {string | number} pocketId - The ID of the pocket to delete.
   */
  deletePocket: async (pocketId) => {
    // We can use the main pocket list's loading and error states for this action.
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.delete(`/pocket/${pocketId}`);

      if (response.data && response.data.ok) {
        // On successful deletion from the server, remove it from the local list.
        get().removePocketFromList(pocketId);
        set({ isAllPocketsLoading: false });
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to delete pocket.");
      }
    } catch (error) {
      console.error("Error deleting pocket:", error);
      set({
        allPocketsError:
          error.message || "An unexpected error occurred while deleting.",
        isAllPocketsLoading: false,
      });
      // Re-throw the error so the component can catch it if needed (e.g., to show a toast).
      throw error;
    }
  },
}));
