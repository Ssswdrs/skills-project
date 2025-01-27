import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Base URL for all requests
  timeout: 5000, // Request timeout in milliseconds
});

// Store a flag to prevent multiple refresh token requests
let isRefreshing = false;
let refreshSubscribers = [];

// Function to subscribe to token refresh
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Function to notify all subscribers about token refresh
const onRrefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token to the Authorization header
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // POST request to refresh the access token
          const username = localStorage.getItem("username");
          const refreshToken = localStorage.getItem("refresh_token");
          const token = localStorage.getItem("access_token");
          const response = await axios.post("http://localhost:8080/auth/refresh", {
            username,
            refreshToken,
          }, {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          });

          const newToken = response.data;
          localStorage.setItem("access_token", newToken.access_token);
          localStorage.setItem("refresh_token", newToken.refresh_token);
          localStorage.setItem("username", newToken.username);
          // Notify all subscribers that the token is refreshed
          onRrefreshed(newToken.access_token);

          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newToken.access_token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          // Optionally handle redirect to login if refresh fails
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If the token is being refreshed, wait for it
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }
    }else{
        window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
