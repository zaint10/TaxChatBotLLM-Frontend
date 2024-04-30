import React, { useEffect } from "react";
import Login from "../components/Login";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    signOut();
  }, [signOut]);

  const handleSubmit = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        email,
        password,
      });
      signIn({
        auth: {
          token: response.data.access,
          type: "Bearer",
        },
        refresh: response.data.refresh,
        userState: {
          email,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <Login onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
