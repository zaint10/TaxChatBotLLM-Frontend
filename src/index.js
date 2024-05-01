import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import createRefresh from "react-auth-kit/createRefresh";
import { SnackbarProvider } from "./context/SnackbarContext";
import apiService from "./service/apiService";

const root = ReactDOM.createRoot(document.getElementById("root"));

const refresh = createRefresh({
  interval: 1, // The time in sec to refresh the Access token
  refreshApiCallback: async (param) => {
    try {
      const response = await apiService.post(
        "/token/refresh/",
        { refresh: param.refreshToken },
        {
          headers: { Authorization: `Bearer ${param.authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.access,
        newAuthTokenExpireIn: 300,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: refresh,
});


root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <AuthProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
