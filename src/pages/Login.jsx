import React, { useEffect } from "react";
import Login from "../components/Login";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import apiService from "../service/apiService";
import { useSnackbar } from "../context/SnackbarContext";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  width: 100%;
`;

const LoginPage = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    signOut();
  }, [signOut]);

  const handleSubmit = async (email, password) => {
    try {
      const response = await apiService.post("/login/", {
        email,
        password,
      });
      signIn({
        auth: {
          token: response.data.access,
          type: "Bearer",
        },
        refresh: response.data.refresh,
        userState: response.data.user,
      });
      navigate("/");
    } catch (error) {
      openSnackbar(error.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginContainer>
      <h1>Let's get you sign in!</h1>
      <Login onSubmit={handleSubmit} />
    </LoginContainer>
  );
};

export default LoginPage;
