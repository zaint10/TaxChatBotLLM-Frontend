import React, { createContext, useContext, useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import apiService from "../service/apiService";

const UserContext = createContext();

export const useAuthUserWrapper = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const authUerAK = useAuthUser();
  const [authUser, setAuthUser] = useState(authUerAK);
  const signIn = useSignIn();

  useEffect(() => {
    const interval = setInterval(() => {
      updateAuthUser();
    }, 60000); // Polling interval in milliseconds (e.g., every minute)
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAuthUser = async () => {
    const response = await fetchUser();
    if (response) {
      signIn({
        auth: {
          token: response.data.access,
          type: "Bearer",
        },
        refresh: response.data.refresh,
        userState: response.data.user,
      });
      setAuthUser(response.data.user);
    }
  };

  

  const fetchUser = async () => {
    try {
      // Make a request to your endpoint to fetch updated user data
      const response = await apiService.get("/users/me");
      return response;
    } catch (error) {
      console.error("Error fetching user settings:", error);
    }
  };
  return (
    <UserContext.Provider value={{ authUser, updateAuthUser }}>
      {children}
    </UserContext.Provider>
  );
};

