// stores/transactionStore.js
import { create } from "zustand";
import api from "@/lib/api";

const initialState = {
  type: { id: "topup", name: "Top-Up" },
  amount: null,
  description: "",
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
  setDescription: (description) => set({ description }),
  resetTransactionState: () => {
    set(initialState);
  },

  // --- STANDARD TRANSACTION APIS ---

  executeTopUp: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: POST /transaction/topup for pocket ID: ${pocketId}`);
    console.log(
      "================================================================",
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
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/transaction/topup", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
      console.error("API Error:", errorMessage);
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  executeWithdraw: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(
      `API Call: POST /transaction/withdraw for pocket ID: ${pocketId}`,
    );
    console.log(
      "================================================================",
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
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/transaction/withdraw", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
      console.error("API Error:", errorMessage);
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  // --- AUTO-BUDGETING APIS ---

  getAutoBudget: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /transaction/auto-budget/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isFetchingAutoBudget: true, fetchAutoBudgetError: null });
    try {
      const response = await api.get(`/transaction/auto-budget/${pocketId}`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
      console.error("API Error:", errorMessage);
      set({ isFetchingAutoBudget: false, fetchAutoBudgetError: errorMessage });
      throw error;
    }
  },

  setAutoBudgeting: async (pocketId, budgetData) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: POST /transaction/set-auto-budget/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isProcessing: true, transactionError: null });
    try {
      console.log("Request Body:", JSON.stringify(budgetData, null, 2));
      const response = await api.post(
        `/transaction/set-auto-budget/${pocketId}`,
        budgetData,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isProcessing: false, transactionResult: response.data.data });
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to set auto-budget.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  deleteAutoBudget: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: DELETE /transaction/auto-budget/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isProcessing: true, transactionError: null });
    try {
      const response = await api.delete(`/transaction/auto-budget/${pocketId}`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
      console.error("API Error:", errorMessage);
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },
}));
