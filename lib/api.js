import axios from "axios";
import useErrorStore from "../stores/errorStore";

const api = axios.create({
  baseURL: "https://5l148m62-8080.asse.devtunnels.ms/api/v1",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const showError = useErrorStore.getState().showError;

    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || "Unexpected error";
      showError({ status, message });
    } else if (err.request) {
      showError({
        status: "Network Error",
        message: "No internet connection.",
      });
    } else {
      showError({ status: "Error", message: err.message });
    }

    return Promise.reject(err);
  },
);

export default api;
