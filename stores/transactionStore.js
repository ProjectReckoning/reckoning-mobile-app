// stores/transactionStore.js
import { create } from "zustand";
import api from "@/lib/api";

const initialState = {
  type: { id: "topup", name: "Top-Up" },
  amount: null,
  description: "",
  category: null,
  source: {
    id: null,
    name: "",
    balance: 19546250,
    category: {
      bank: { name: null, type: null },
      pocket: { name: null, type: null },
    },
  },
  destination: {
    id: null,
    name: null,
    category: {
      bank: { name: null, type: null },
      pocket: { name: null, type: null },
    },
  },
  selectedDate: null,
  selectedStartDate: null,
  selectedEndDate: null,
  isProcessing: false,
  transactionError: null,
  transactionResult: null,
  scheduledTransfers: [],
  autoBudgetConfig: null,
  isFetchingAutoBudget: false,
  fetchAutoBudgetError: null,
};

export const useTransactionStore = create((set, get) => ({
  ...initialState,

  // --- SETTERS ---
  setType: (type) => set({ type }),
  setAmount: (amount) =>
    set({
      amount:
        typeof amount === "string"
          ? parseInt(amount.replace(/\D/g, ""), 10) || 0
          : amount,
    }),
  setSource: (source) => set({ source }),
  setDestination: (destination) => set({ destination }),
  setDescription: (description) => set({ description }),
  setCategory: (category) => set({ category }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedStartDate: (startDate) => set({ selectedStartDate: startDate }),
  setSelectedEndDate: (endDate) => set({ selectedEndDate: endDate }),
  resetTransactionState: () => {
    set(initialState);
  },

  // --- STANDARD TRANSACTION API FUNCTIONS ---

  executeTopUp: async (pocketId) => {
    console.log(`API Call: POST /transaction/topup for pocket ID: ${pocketId}`);
    set({
      isProcessing: true,
      transactionError: null,
      transactionResult: null,
    });
    const { amount } = get();
    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
    };
    try {
      const response = await api.post("/transaction/topup", requestBody);
      if (response.data && response.data.ok) {
        set({ isProcessing: false, transactionResult: response.data.data });
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Top-up failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  executeWithdraw: async (pocketId) => {
    console.log(
      `API Call: POST /transaction/withdraw for pocket ID: ${pocketId}`,
    );
    set({
      isProcessing: true,
      transactionError: null,
      transactionResult: null,
    });
    const { amount } = get();
    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
    };
    try {
      const response = await api.post("/transaction/withdraw", requestBody);
      if (response.data && response.data.ok) {
        set({ isProcessing: false, transactionResult: response.data.data });
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Withdrawal failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  executeTransfer: async (pocketId) => {
    console.log(
      `API Call: POST /transaction/transfer for pocket ID: ${pocketId}`,
    );
    set({
      isProcessing: true,
      transactionError: null,
      transactionResult: null,
    });
    const { amount, destination, description } = get();
    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
      destination: destination.name,
      description: description || `Transfer to ${destination.name}`,
    };
    try {
      const response = await api.post("/transaction/transfer", requestBody);
      if (response.data && response.data.ok) {
        set({ isProcessing: false, transactionResult: response.data.data });
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Transfer failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  // --- AUTO-BUDGETING APIS ---

  getAutoBudget: async (pocketId) => {
    console.log(`API Call: GET /transaction/auto-budget/${pocketId}`);
    set({ isFetchingAutoBudget: true, fetchAutoBudgetError: null });
    try {
      const response = await api.get(`/transaction/auto-budget/${pocketId}`);
      if (response.data && response.data.ok) {
        const autoBudget = response.data.data[0] || null;
        set({
          isFetchingAutoBudget: false,
          autoBudgetConfig: autoBudget,
        });
        return autoBudget;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch auto-budget.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isFetchingAutoBudget: false, fetchAutoBudgetError: errorMessage });
      throw error;
    }
  },

  setAutoBudgeting: async (pocketId, budgetData) => {
    console.log(`API Call: POST /transaction/set-auto-budget/${pocketId}`);
    set({ isProcessing: true, transactionError: null });
    try {
      const response = await api.post(
        `/transaction/set-auto-budget/${pocketId}`,
        budgetData,
      );
      if (response.data && response.data.ok) {
        set({ isProcessing: false, transactionResult: response.data.data });
        // The API for set-auto-budget returns the transaction result directly
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to set auto-budget.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  deleteAutoBudget: async (pocketId) => {
    console.log(`API Call: DELETE /transaction/auto-budget/${pocketId}`);
    set({ isProcessing: true, transactionError: null });
    try {
      const response = await api.delete(`/transaction/auto-budget/${pocketId}`);
      if (response.data && response.data.ok) {
        set({ isProcessing: false, autoBudgetConfig: null });
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to delete auto-budget.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },
}));
