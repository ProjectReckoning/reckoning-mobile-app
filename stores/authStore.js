import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

const useAuthStore = create((set, get) => ({
  token: null,
  user: null,

  setToken: async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token });
  },

  loadToken: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    set({ token });
    return token;
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
