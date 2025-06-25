// stores/pocketStore.js
import { create } from "zustand";
import api from "@/lib/api";

const colorClassToHex = {
  "bg-orange-wondr": "#FF7A00",
  "bg-yellow-wondr": "#FFC700",
  "bg-lime-wondr": "#A8E05F",
  "bg-tosca-wondr": "#58ABA1",
  "bg-purple-wondr": "#8A2BE2",
  "bg-pink-wondr": "#FF69B4",
};

const hexToColorClass = {
  "#FF7A00": "bg-orange-wondr",
  "#FFC700": "bg-yellow-wondr",
  "#A8E05F": "bg-lime-wondr",
  "#58ABA1": "bg-tosca-wondr",
  "#8A2BE2": "bg-purple-wondr",
  "#FF69B4": "bg-pink-wondr",
};

const typeToDisplayType = {
  saving: "Saving",
  spending: "Spending",
  business: "Business",
};

export const usePocketStore = create((set, get) => ({
  // --- State ---
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
  pocketColor: null,
  setPocketColor: (color) => set({ pocketColor: color }),
  pocketIcon: "pocket",
  setPocketIcon: (icon) => set({ pocketIcon: icon }),
  isCreating: false,
  createError: null,
  isUpdating: false,
  updateError: null,
  newFriend: null,
  setNewFriend: (friend) => set({ newFriend: friend }),
  currentPocket: null,
  isLoading: false,
  error: null,
  transactionHistory: [],
  isHistoryLoading: false,
  historyError: null,
  allPockets: [],
  isAllPocketsLoading: false,
  allPocketsError: null,

  // --- Actions ---

  createPocket: async () => {
    console.log("--- [STORE] createPocket: Initiated ---");
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
      "Business Fund": "business",
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

  updatePocket: async (pocketId) => {
    console.log(`--- [STORE] updatePocket: Initiated for ID: ${pocketId} ---`);
    set({ isUpdating: true, updateError: null });

    const { pocketName, pocketType, pocketIcon, pocketColor } = get();

    const requestBody = {
      name: pocketName,
      type: pocketType === "Spending" ? "spending" : "saving",
      icon_name: pocketIcon,
      color_hex: colorClassToHex[pocketColor] || "#FF7A00",
    };

    try {
      const response = await api.patch(`/pocket/${pocketId}`, requestBody);
      if (response.data && response.data.ok) {
        set({ isUpdating: false });
        get().fetchAllPockets();
        return response.data.data;
      } else {
        throw new Error(response.data?.message || "Pocket update failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ updateError: errorMessage, isUpdating: false });
      throw error;
    }
  },

  setPocketForEditing: (pocket) => {
    if (!pocket) return;
    set({
      pocketName: pocket.name,
      pocketType: pocket.type,
      pocketIcon: pocket.icon_name,
      pocketColor: pocket.color,
    });
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
      pocketColor: null,
      pocketIcon: "pocket",
      isCreating: false,
      createError: null,
      isUpdating: false,
      updateError: null,
      newFriend: null,
    });
  },

  fetchAllPockets: async () => {
    console.log("--- [STORE] fetchAllPockets: Initiated ---");
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.get("/pocket"); // Intentionally incorrect path for testing
      if (response.data && response.data.ok) {
        const pockets = (response.data.data || []).map((pocket) => ({
          ...pocket,
          color:
            hexToColorClass[pocket.color_hex?.toUpperCase()] || pocket.color,
          type: typeToDisplayType[pocket.type] || pocket.type,
        }));
        set({
          allPockets: pockets,
          isAllPocketsLoading: false,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch pockets.");
      }
    } catch (error) {
      set({
        allPocketsError: error.message || "An unexpected error occurred.",
        isAllPocketsLoading: false,
        allPockets: [],
      });
      throw error; // <-- RE-THROW THE ERROR
    }
  },

  fetchPocketById: async (id) => {
    console.log(`--- [STORE] fetchPocketById: Initiated for ID: ${id} ---`);
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/pocket/${id}`);
      if (response.data && response.data.ok) {
        const pocket = response.data.data;
        const pocketWithColor = {
          ...pocket,
          color:
            hexToColorClass[pocket.color_hex?.toUpperCase()] || pocket.color,
          type: typeToDisplayType[pocket.type] || pocket.type,
        };
        set({
          currentPocket: pocketWithColor,
          isLoading: false,
        });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch pocket data.",
        );
      }
    } catch (error) {
      set({
        error: error.message || "An unexpected error occurred.",
        isLoading: false,
        currentPocket: null,
      });
      throw error; // <-- RE-THROW THE ERROR
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
      set({
        historyError: error.message || "An unexpected error occurred.",
        isHistoryLoading: false,
        transactionHistory: [],
      });
      throw error; // <-- RE-THROW THE ERROR
    }
  },

  removePocketFromList: (pocketId) => {
    set((state) => ({
      allPockets: state.allPockets.filter((p) => p.pocket_id !== pocketId),
    }));
  },

  deletePocket: async (pocketId) => {
    console.log(`--- [STORE] deletePocket: Initiated for ID: ${pocketId} ---`);
    set({ isAllPocketsLoading: true, allPocketsError: null });
    try {
      const response = await api.delete(`/pocket/${pocketId}`);
      if (response.data && response.data.ok) {
        get().removePocketFromList(pocketId);
        set({ isAllPocketsLoading: false });
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to delete pocket.");
      }
    } catch (error) {
      set({
        allPocketsError:
          error.message || "An unexpected error occurred while deleting.",
        isAllPocketsLoading: false,
      });
      throw error; // <-- RE-THROW THE ERROR
    }
  },
}));
