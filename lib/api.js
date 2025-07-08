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
      const message = "Oops, terdapat kesalahan.";
      console.warn("API Error:", {
        status,
        message: err.response.data?.message,
        responseData: err.response.data,
      });
      // Show the modal with API error details
      showError({
        status: "Kesalahan",
        message,
      });

      if (status === 401) {
        useAuthStore.getState().removeToken();
        router.replace("/(auth)/login");
      }
    } else if (err.request) {
      const status = "Kesalahan Jaringan";
      const message = "Koneksi buruk. Silakan periksa koneksi internet.";
      console.warn("Network Error:", message);
      // Show the modal with a network error
      showError({ status, message });
    } else {
      const status = "Terdapat kesalahan";
      const message = "Oops, terjadi kesalahan";
      console.warn("Error:", message);
      // Show the modal with a generic error
      showError({ status, message });
    }

    return Promise.reject(err);
  },
);

export default api;
