// lib/api.js
import axios from "axios";
import useErrorStore from "@/stores/errorStore"; // Keep import, but calls to showError are commented
import useAuthStore from "@/stores/authStore";
import { router } from "expo-router";

const api = axios.create({
  baseURL: "http://3.0.98.158:8080/api/v1",
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // const showError = useErrorStore.getState().showError; // No longer used for direct display

    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || "Unexpected error";
      console.error("API Error:", {
        status,
        message,
        responseData: err.response.data,
      });
      // Removed: showError({ status, message });

      if (status === 401) {
        useAuthStore.getState().removeToken();
        router.replace("/(auth)/login");
      }
    } else if (err.request) {
      console.error("Network Error:", "No internet connection.");
      // Removed: showError({ status: "Network Error", message: "No internet connection." });
    } else {
      console.error("Error:", err.message);
      // Removed: showError({ status: "Error", message: err.message });
    }

    return Promise.reject(err);
  },
);

export default api;
