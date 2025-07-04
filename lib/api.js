// lib/api.js
import axios from "axios";
import useErrorStore from "@/stores/errorStore"; // Import the store
import useAuthStore from "@/stores/authStore";
import { router } from "expo-router";

const api = axios.create({
  baseURL: "https://api.ujiancatsurajadi.com/api/v1",
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
    // Get the showError function from the store
    const showError = useErrorStore.getState().showError;

    if (err.response) {
      const status = err.response.status;
      const message =
        err.response.data?.message ||
        "An unexpected error occurred from the server.";
      console.warn("API Error:", {
        status,
        message,
        responseData: err.response.data,
      });
      // Show the modal with API error details
      showError({ status: `Error: ${status}`, message });

      if (status === 401) {
        useAuthStore.getState().removeToken();
        router.replace("/(auth)/login");
      }
    } else if (err.request) {
      const status = "Network Error";
      const message =
        "Could not connect to the server. Please check your internet connection.";
      console.warn("Network Error:", message);
      // Show the modal with a network error
      showError({ status, message });
    } else {
      const status = "Something went wrong";
      const message = err.message || "An unknown client-side error occurred.";
      console.warn("Error:", message);
      // Show the modal with a generic error
      showError({ status, message });
    }

    return Promise.reject(err);
  },
);

export default api;
