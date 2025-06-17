// stores/authStore.js
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user"; // Key for storing user data

const useAuthStore = create((set, get) => ({
  token: null,
  user: null, // Add user to state

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
    return { token, user }; // Return both for initial checks
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY); // Also remove user data
    set({ token: null, user: null }); // Clear state
  },
}));

export default useAuthStore;
