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
  currentSchedule: null,
  isFetchingScheduleDetail: false,
  fetchScheduleDetailError: null,
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
    const { amount, source } = get();
    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
      description: `Top Up dari ${source.name}`,
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
    const { amount, destination } = get();
    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
      description: `Withdraw ke ${destination.name}`,
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
      // --- FIX: Replaced period with opening brace ---
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
    const { amount, destination, description, category } = get();

    const categoryMapping = {
      Pembelian: "pembelian",
      Gaji: "gaji",
    };

    const requestBody = {
      balance: amount,
      pocket_id: parseInt(pocketId, 10),
      destination: destination.name,
      description: description || `Transfer ke ${destination.name}`,
    };

    if (category && categoryMapping[category]) {
      requestBody.category = categoryMapping[category];
    }

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
      const listResponse = await api.get(
        `/transaction/transfer/schedule/${pocketId}`,
      );
      console.log(
        "Response Schedule Received:",
        JSON.stringify(listResponse.data, null, 2),
      );

      if (!listResponse.data || !listResponse.data.ok) {
        throw new Error(
          listResponse.data.message || "Failed to fetch schedule list.",
        );
      }

      const initialList = listResponse.data.data || [];
      if (initialList.length === 0) {
        set({ scheduleTransferConfig: [], isFetchingScheduleTransfer: false });
        return [];
      }

      const detailPromises = initialList.map((item) =>
        api.get(`/transaction/transfer/schedule/${pocketId}/${item.id}`),
      );

      const detailResponses = await Promise.all(detailPromises);

      const finalScheduleList = detailResponses.map((res) => res.data.data);

      set({
        scheduleTransferConfig: finalScheduleList,
        isFetchingScheduleTransfer: false,
      });

      return finalScheduleList;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        scheduleTransferConfig: [],
        isFetchingScheduleTransfer: false,
        fetchScheduleTransferError: errorMessage,
      });
      throw error;
    }
  },

  getScheduleDetail: async (pocketId, scheduleId) => {
    console.log(
      "================================================================",
    );
    console.log(
      `API Call: GET /transaction/transfer/schedule/${pocketId}/${scheduleId}`,
    );
    console.log(
      "================================================================",
    );
    set({ isFetchingScheduleDetail: true, fetchScheduleDetailError: null });
    try {
      const response = await api.get(
        `/transaction/transfer/schedule/${pocketId}/${scheduleId}`,
      );
      console.log(
        "Response Schedule Received:",
        JSON.stringify(response.data, null, 2),
      );
      if (response.data && response.data.ok) {
        const schedule = response.data.data || [];
        set({
          currentSchedule: schedule,
          isFetchingScheduleDetail: false,
        });
        return schedule;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch schedule transfer detail.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({
        currentSchedule: null,
        isFetchingScheduleDetail: false,
        fetchScheduleDetailError: errorMessage,
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

    let formattedStartDate = selectedStartDate;
    if (selectedStartDate && selectedDate) {
      const startObj = new Date(selectedStartDate);
      if (!isNaN(startObj.getTime())) {
        startObj.setDate(selectedDate);
        formattedStartDate = startObj.toISOString().slice(0, 10);
      }
    }

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
        set({ transactionResult: response.data.data, isProcessing: false });
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

  deleteScheduleTransfer: async (pocketId, scheduleId) => {
    console.log(
      "================================================================",
    );
    console.log(
      `API Call: DELETE /transaction/transfer/schedule/${pocketId}/${scheduleId}`,
    );
    console.log(
      "================================================================",
    );
    set({ isProcessing: true, transactionError: null });
    try {
      const response = await api.delete(
        `/transaction/transfer/schedule/${pocketId}/${scheduleId}`,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isProcessing: false });
        get().getScheduleTransfer(pocketId);
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to delete scheduled transfer.",
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

  respondToTransfer: async (trasactionId, responseAction) => {
    console.log(
      "================================================================",
    );
    console.log("API Call: PATCH /transaction/transfer/{transactionId}");
    console.log(
      "================================================================",
    );
    set({ isProcessing: true, transactionError: null });
    const requestBody = { status: responseAction };
    try {
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
      const response = await api.patch(
        `/transaction/transfer/${trasactionId}`,
        requestBody,
      );
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ isProcessing: false });
        return response.data;
      } else {
        throw new Error(
          response.data.message || "Failed to respond to invite.",
        );
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ transactionError: errorMessage, isProcessing: false });
      throw error;
    }
  },
}));
