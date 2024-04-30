import React from "react";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import apiService from "../service/apiService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const handleSubmit = async (email, password) => {
    try {
      const response = await apiService.post("/signup/", {
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
        isSignIn: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <SignUp onSubmit={handleSubmit}></SignUp>
    </div>
  );
};

export default SignUpPage;
