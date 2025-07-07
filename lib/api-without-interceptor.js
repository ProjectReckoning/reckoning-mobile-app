import axios from "axios";
import useAuthStore from "@/stores/authStore";

const apiWithoutResponseInterceptor = axios.create({
  baseURL: "https://api.ujiancatsurajadi.com/api/v1",
});

apiWithoutResponseInterceptor.interceptors.request.use(
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

export default apiWithoutResponseInterceptor;
