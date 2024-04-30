// api.js
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL: apiUrl,
});

const getAuthorizationHeader = () => {
  const authToken = Cookies.get("_auth");
  if (!authToken) {
    return null;
  }
  return `Bearer ${authToken}`;
};

// Add an interceptor to set the Authorization header
apiService.interceptors.request.use((config) => {
  const authHeader = getAuthorizationHeader();
  if (authHeader) {
    config.headers.Authorization = authHeader;
  }

  return config;
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Construct error message
    let errorMessage = "An error occurred";
    const { code } = error;
    if (error.response) {
      // The request was made and the server responded with a status code
      errorMessage = `${code}: Request failed with status code ${error.response.status}(${error.response.statusText})`;
      if (error.response.data) {
        let serverMessage = "";
        if (error.response.data.error) {
          serverMessage = error.response.data.error;
        }

        if (serverMessage) {
          errorMessage += `\n${serverMessage}`;
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = `${code}: ${error.message}`;
    } else {
      // Something happened in setting up the request that triggered an error
      errorMessage = "ERR_CLIENT: Error occurred while processing the request";
    }

    // Create a new error object with the constructed message
    const newError = {
      ...error,
      message: errorMessage,
    };

    // Throw the new error object
    throw newError;
  }
);

export default apiService;
