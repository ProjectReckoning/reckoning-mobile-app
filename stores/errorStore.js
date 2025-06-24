// stores/errorStore.js
import { create } from "zustand";

const useErrorStore = create((set) => ({
  visible: false,
  status: null,
  message: null,

  showError: ({ status, message }) => {
    console.log("[errorStore] showError CALLED. Setting visible to true."); // <-- ADD THIS LINE
    set({ visible: true, status, message });
  },

  hideError: () => set({ visible: false, status: null, message: null }),
}));

export default useErrorStore;
