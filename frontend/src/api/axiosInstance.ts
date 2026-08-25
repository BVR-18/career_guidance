import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

// Normalize base URL so http(s)://domain.com automatically appends /api if omitted
const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) return "/api";
  let normalized = envUrl.trim().replace(/\/$/, "");
  if (!normalized.endsWith("/api")) {
    normalized += "/api";
  }
  return normalized;
};

const BASE_URL = getBaseUrl();

export const TOKEN_KEY = "careerverse_token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // withCredentials not needed — auth uses JWT via Authorization header, not cookies.
  // Enabling it with a wildcard CORS origin causes browser rejections.
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT to every outgoing request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// A subscriber the AuthContext registers so this module (which cannot use hooks)
// can trigger a logout + redirect when a request comes back 401.
let onUnauthorized: (() => void) | null = null;
export const registerUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      toast.error("Session expired. Please login again.");
      onUnauthorized?.();
    } else if (error.response?.status && error.response.status >= 500) {
      toast.error("Something went wrong on our end. Please try again shortly.");
    } else if (error.code === "ERR_NETWORK") {
      toast.error("Can't reach the server. Check your connection and try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
