// stores/transactionStore.js
import { create } from "zustand";
import api from "@/lib/api";

const initialState = {
  type: { id: "topup", name: "Top-Up" },
  amount: null,
  description: "",
  source: {
    id: null,
    name: "",
    balance: 19546250,
    category: {
      bank: {
        name: null,
        type: null,
      },
      pocket: {
        name: null,
        type: null,
      },
    },
  },
  destination: {
    id: null,
    name: null,
    category: {
      bank: {
        name: null,
        type: null,
      },
      pocket: {
        name: null,
        type: null,
      },
    },
  },
  isProcessing: false,
  transactionError: null,
  transactionResult: null,
};

export const useTransactionStore = create((set, get) => ({
  ...initialState,

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

  resetTransactionState: () => {
    set(initialState);
  },

  executeTopUp: async (pocketId) => {
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
        set({
          isProcessing: false,
          transactionResult: response.data.data,
        });
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
        set({
          isProcessing: false,
          transactionResult: response.data.data,
        });
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
      `[STORE] executeTransfer: Initiated for pocket ID: ${pocketId}`,
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
      console.log(
        "[STORE] executeTransfer: Request Body:",
        JSON.stringify(requestBody, null, 2),
      );
      const response = await api.post("/transaction/transfer", requestBody);
      console.log(
        "[STORE] executeTransfer: Response Received:",
        JSON.stringify(response.data, null, 2),
      );

      if (response.data && response.data.ok) {
        set({
          isProcessing: false,
          transactionResult: response.data.data,
        });
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
}));
