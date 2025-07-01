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
  selectedDate: null,
  selectedStartDate: null,
  selectedEndDate: null,
  isProcessing: false,
  transactionError: null,
  transactionResult: null,
  scheduledTransfers: [],
  scheduleTransferConfig: null,
  isFetchingScheduleTransfer: false,
  fetchScheduleTransferError: null,
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

  executeTransfer: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(
      `API Call: POST /transaction/transfer for pocket ID: ${pocketId}`,
    );
    console.log(
      "================================================================",
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
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post("/transaction/transfer", requestBody);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
      console.error("API Error:", errorMessage);
      set({ isProcessing: false, transactionError: errorMessage });
      throw error;
    }
  },

  // --- SCHEDULE TRANSFER APIS ---
  getScheduleTransfer: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /transaction/transfer/schedule/${pocketId}`);
    console.log(
      "================================================================",
    );
    set({ isFetchingScheduleTransfer: true, fetchScheduleTransferError: null });
    try {
      const response = await api.get(
        `/transaction/transfer/schedule/${pocketId}`,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        const scheduleTransfer = response.data.data || [];
        set({
          isFetchingScheduleTransfer: false,
          scheduleTransferConfig: scheduleTransfer,
        });
        return scheduleTransfer;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch schedule transfer.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        scheduleTransferConfig: null,
        isFetchingScheduleTransfer: false,
        fetchScheduleTransferError: errorMessage,
      });
      throw error;
    }
  },

  executeScheduleTransfer: async (pocketId) => {
    console.log(
      "================================================================",
    );
    console.log(
      `API Call: POST /transaction/transfer/schedule for pocket ID: ${pocketId}`,
    );
    console.log(
      "================================================================",
    );
    set({
      isProcessing: true,
      transactionError: null,
      transactionResult: null,
    });
    const {
      amount,
      destination,
      selectedDate,
      selectedStartDate,
      selectedEndDate,
      category,
    } = get();

    // Combine selectedDate (day) with month/year from selectedStartDate for "start"
    let formattedStartDate = selectedStartDate;
    if (selectedStartDate && selectedDate) {
      const startObj = new Date(selectedStartDate);
      if (!isNaN(startObj.getTime())) {
        // Use year/month from selectedStartDate, day from selectedDate
        startObj.setDate(selectedDate);
        formattedStartDate = startObj.toISOString().slice(0, 10);
      }
    }

    // Format selectedEndDate to "YYYY-MM-DD" if it exists and is a valid date
    let formattedEndDate = selectedEndDate;
    if (selectedEndDate) {
      const dateObj = new Date(selectedEndDate);
      if (!isNaN(dateObj.getTime())) {
        formattedEndDate = dateObj.toISOString().slice(0, 10);
      }
    }

    const categoryMapping = {
      Pembelian: "pembelian",
      Gaji: "gaji",
      "Pemindahan Dana": "transfer",
    };
    const formattedCategory =
      category && categoryMapping[category]
        ? categoryMapping[category]
        : "lainnya";

    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
      destination: destination.name,
      date: formattedStartDate,
      start: formattedStartDate,
      end: formattedEndDate,
      category: formattedCategory,
    };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.post(
        "/transaction/transfer/schedule",
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
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
