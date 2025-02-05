import axios from "axios";
import { store } from "./../app/app";

const axiosInstanceForServer = axios.create({
  baseURL: "https://server.numbersms.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: true,
  withCredentials: true,
});

axiosInstanceForServer.interceptors.request.use(
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

export default axiosInstanceForServer;
