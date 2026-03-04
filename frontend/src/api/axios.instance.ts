import axios from "axios";
import { raw } from "./raw.api";
import { logout } from "../shared/utils/logout";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((refreshErr) => {
            return Promise.reject(refreshErr);
          });
      }

      isRefreshing = true

      try {
        await raw.post("/auth/refresh", {}, { withCredentials: true });
        isRefreshing = false
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false
        processQueue(refreshErr, null);
        logout();
        return Promise.reject(refreshErr);
      }
    }
    throw err;
  }
);


export default axiosInstance;
