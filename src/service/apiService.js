// api.js
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL: apiUrl,
});

const getAuthorizationHeader = () => {
  const authToken = Cookies.get("_auth");
  return `Bearer ${authToken}`;
};

// Add an interceptor to set the Authorization header
apiService.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthorizationHeader();
  return config;
});

export default apiService;
