import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUnreadCount } from "../utils/notification/notification";

const STORAGE_KEY = "notification-read-ids";

export const useNotificationStore = create((set, get) => ({
  readIds: [],
  loadReadIds: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) set({ readIds: JSON.parse(stored) });
    } catch (e) {
      console.log("Error loading read IDs from AsyncStorage:", e);
    }
  },
  markAsRead: async (id) => {
    const { readIds } = get();
    if (!readIds.includes(id)) {
      const newReadIds = [...readIds, id];
      set({ readIds: newReadIds });
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReadIds));
      } catch (e) {
        console.log("Error saving read IDs to AsyncStorage:", e);
      }
    }
  },
  resetReadIds: async () => {
    set({ readIds: [] });
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.log("Error resetting read IDs in AsyncStorage:", e);
    }
  },
}));
