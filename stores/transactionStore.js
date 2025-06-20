import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  type: { id: "topup", name: "Top-Up" },
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
    id: 1916837397,
    name: "AMIRA FERIAL",
    type: "TAPLUS PEGAWAI BNI",
    balance: 19546250,
  },
  setSource: (source) => set({ source }),

  destination: {
    id: null,
    name: "",
    bank: "BNI",
    pocket: { id: "0238928039", name: "", type: "SHARED POCKET BNI" },
  },
  setDestination: (destination) => set({ destination }),
}));
