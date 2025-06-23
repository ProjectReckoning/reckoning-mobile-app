import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  type: { id: null, name: "" },
  setType: (type) => set({ type }),

  amount: null,
  setAmount: (amount) =>
    set({
      amount:
        typeof amount === "string"
          ? parseInt(amount.replace(/\D/g, ""), 10) || 0
          : amount,
    }),

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
  setSource: (source) => set({ source }),

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
  setDestination: (destination) => set({ destination }),

  resetTransactionData: () => {
    set({
      type: { id: null, name: "" },
      amount: null,
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
    });
  },
}));
