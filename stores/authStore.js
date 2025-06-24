// stores/authStore.js
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "@/lib/api"; // Make sure your api instance is imported

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user"; // Key for storing user data

const useAuthStore = create((set, get) => ({
  token: null,
  user: null, // Add user to state
  isFetchingUser: false,
  fetchUserError: null,

  setToken: async (token, user = null) => {
    // Accept user as a parameter
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    if (user) {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)); // Store user data as string
    } else {
      await SecureStore.deleteItemAsync(USER_KEY); // Clear user if not provided
    }
    set({ token, user }); // Update Zustand store with both
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const userString = await SecureStore.getItemAsync(USER_KEY);
    const user = userString ? JSON.parse(userString) : null; // Parse user data
    set({ token, user }); // Update Zustand store with both
    if (token) {
      get().fetchUser(); // Fetch latest user data if token exists
    }
    return { token, user }; // Return both for initial checks
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY); // Also remove user data
    set({ token: null, user: null }); // Clear state
  },

  // --- NEW: Action to fetch user data from the API ---
  fetchUser: async () => {
    set({ isFetchingUser: true, fetchUserError: null });
    try {
      const response = await api.get("/user/me");
      if (response.data && response.data.ok) {
        const fetchedUserData = response.data.data;
        // Merge new data with existing user data in the store
        set((state) => ({
          user: { ...state.user, ...fetchedUserData },
          isFetchingUser: false,
        }));
        // Update user data in SecureStore as well
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(get().user));
      } else {
        throw new Error(response.data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      set({
        fetchUserError: error.message,
        isFetchingUser: false,
      });
      console.error("Error fetching user data:", error);
    }
  },
}));

export default useAuthStore;
