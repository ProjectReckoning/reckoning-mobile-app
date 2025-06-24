// stores/authStore.js
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "@/lib/api";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  isFetchingUser: false,
  fetchUserError: null,

  setToken: async (token, user = null) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    if (user) {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync(USER_KEY);
    }
    set({ token, user });
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const userString = await SecureStore.getItemAsync(USER_KEY);
    const user = userString ? JSON.parse(userString) : null;
    set({ token, user });
    if (token) {
      get().fetchUser();
    }
    return { token, user };
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    set({ token: null, user: null });
  },

  fetchUser: async () => {
    set({ isFetchingUser: true, fetchUserError: null });
    try {
      const response = await api.get("/user/me");
      if (response.data && response.data.ok) {
        const fetchedUserData = response.data.data;
        set((state) => ({
          user: { ...state.user, ...fetchedUserData },
          isFetchingUser: false,
        }));
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(get().user));
      } else {
        throw new Error(response.data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      set({
        fetchUserError: error.message,
        isFetchingUser: false,
      });
      // console.error removed, as it's now handled globally by api.js
    }
  },
}));

export default useAuthStore;
