import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  type: "topup",
  setType: (type) => set({ type }),

  amount: null,
  setAmount: (amount) =>
    set({
      amount:
        typeof amount === "string"
          ? parseInt(amount.replace(/\D/g, ""), 10) || 0
          : amount,
    }),

  source: { id: 1916837397, name: "AMIRA FERIAL", type: "TAPLUS PEGAWAI BNI" },
  setSource: (source) => set({ source }),

  destination: {
    id: null,
    name: "",
    type: "",
    typeName: "",
  },
  setDestination: (destination) => set({ destination }),
}));
