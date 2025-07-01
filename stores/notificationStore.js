// stores/notificationStore.js
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/api";

const STORAGE_KEY = "notification-read-ids";

export const useNotificationStore = create((set, get) => ({
  // --- EXISTING STATE ---
  selectedNotification: null,
  readIds: [],

  // --- NEW STATE ---
  notifications: [],
  isLoading: false,
  error: null,
  isDetailLoading: false, // For fetching single notification detail

  // --- ACTIONS ---
  setSelectedNotification: (notification) =>
    set({ selectedNotification: notification }),

  // --- Read Status Management (No Changes) ---
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

  // --- NEW API FUNCTIONS ---
  fetchAllNotifications: async () => {
    console.log(
      "================================================================",
    );
    console.log("API Call: GET /user/notification");
    console.log(
      "================================================================",
    );
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/user/notification");
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({ notifications: response.data.data || [], isLoading: false });
      } else {
        throw new Error(
          response.data.message || "Failed to fetch notifications.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ error: errorMessage, isLoading: false, notifications: [] });
      throw error;
    }
  },

  fetchNotificationById: async (notifId) => {
    console.log(
      "================================================================",
    );
    console.log(`API Call: GET /user/notification/${notifId}`);
    console.log(
      "================================================================",
    );
    set({ isDetailLoading: true, error: null, selectedNotification: null });
    try {
      const response = await api.get(`/user/notification/${notifId}`);
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        set({
          selectedNotification: response.data.data,
          isDetailLoading: false,
        });
        // Also mark it as read when fetched
        get().markAsRead(notifId);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch notification detail.",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error:", errorMessage);
      set({ error: errorMessage, isDetailLoading: false });
      throw error;
    }
  },
}));
