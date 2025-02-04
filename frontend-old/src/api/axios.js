import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://api.numbersms.com/api`,
  credentials: true,
  withCredentials: true,
});

export default axiosInstance;
