import { create } from "zustand";

const useErrorStore = create((set) => ({
  visible: false,
  status: null,
  message: null,

  showError: ({ status, message }) => set({ visible: true, status, message }),

  hideError: () => set({ visible: false, status: null, message: null }),
}));

export default useErrorStore;
