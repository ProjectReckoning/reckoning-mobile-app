// stores/authStore.js
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/api";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user"; // Key to cache user data

const useAuthStore = create((set, get) => ({
  token: null,
  user: null, // This will hold user data like name and balance
  isLoading: true,
  isFetchingUser: false,

  fetchUser: async () => {
    // Prevent multiple simultaneous fetches
    if (get().isFetchingUser) return;

    console.log(
      "================================================================",
    );
    console.log("API Call: GET /user/me");
    console.log(
      "================================================================",
    );
    set({ isFetchingUser: true });

    try {
      const response = await api.get("/user/me");
      console.log("Response Received:", JSON.stringify(response.data, null, 2));
      if (response.data && response.data.ok) {
        const userData = response.data.data;
        set({ user: userData, isFetchingUser: false });
        // Store user data alongside the token for faster app loads
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        return userData;
      } else {
        throw new Error(response.data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      console.error("API Error fetching user:", errorMessage);
      set({ isFetchingUser: false, user: null });
      throw error;
    }
  },

  setToken: async (newToken) => {
    set({ token: newToken, isLoading: false });
    await AsyncStorage.setItem(TOKEN_KEY, newToken);
    if (newToken) {
      // When a new token is set (at login), fetch user data immediately
      get().fetchUser();
    }
  },

  loadToken: async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const userString = await AsyncStorage.getItem(USER_KEY);
      const cachedUser = userString ? JSON.parse(userString) : null;

      set({ token: storedToken, user: cachedUser, isLoading: false });

      // If a token exists, refresh the user data in the background
      if (storedToken) {
        get().fetchUser();
      }
    } catch (e) {
      console.error("Failed to load token/user from storage", e);
      set({ isLoading: false });
    }
  },

  removeToken: async () => {
    set({ token: null, user: null }); // Also clear user data on logout
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  },
}));

export default useAuthStore;
