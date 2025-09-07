import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

let onLogout = null;

export const setLogoutHandler = (fn) => {
  onLogout = fn;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Try refreshing token
        await axios.post(
          `${backendUrl}/api/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (onLogout) onLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
