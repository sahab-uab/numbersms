import axios from "axios";
import { store } from "./../app/app";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: true,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
