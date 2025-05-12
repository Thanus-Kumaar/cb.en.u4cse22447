import axios from "axios";
import { getToken } from "../auth/tokenManager.js";
import { refreshToken } from "./refreshJWT.js";

// instance for getting jwt token from test server in case of expiration
const authorizationInstance = axios.create({
  baseURL: "http://20.244.56.144/evaluation-service/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// instance used for querying the stock data
const queryInstance = axios.create({
  baseURL: "http://20.244.56.144/evaluation-service/",
  headers: {
    "Content-Type": "application/json",
  },
});

// attaching the jwt token from getter function
queryInstance.interceptors.request.use(
  (config) => {
    const jwt = getToken();
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    } else {
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// if any query request fails with status code 401, then JWT refreshes automatically
queryInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshToken();

        // After refreshing, retrying the failed request with the new token
        const jwt = getToken();
        if (jwt) {
          error.config.headers.Authorization = `Bearer ${jwt}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("[ERR]: Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { authorizationInstance, queryInstance };
