import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     switch (status) {
//       case 401:
//         console.error("Unauthorized! Redirecting to login...");
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//         break;
//       case 500:
//         console.error("Server error! Please try again later.");
//         break;
//       default:
//         console.error(`Error ${status}: ${error.message}`);
//     }
//     return Promise.reject(error);
//   }
// );

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  credentials: true,
  withCredentials: true,
});

export default axiosInstance;

// export default axiosInstance;
