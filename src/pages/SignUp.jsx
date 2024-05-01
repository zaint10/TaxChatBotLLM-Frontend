import React from "react";
import SignUp from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import apiService from "../service/apiService";
import { useSnackbar } from "../context/SnackbarContext";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  width: 100%;
`;


const NavLink = styled(Link)`
  color: inherit;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: #007bff;
  }
`;

const SignUpPage = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { openSnackbar } = useSnackbar();
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
      openSnackbar(error.message);
      console.error("Sign failed:", error);
    }
  };

  return (
    <SignUpContainer>
      <h1>Create an Account</h1>
      <SignUp onSubmit={handleSubmit}></SignUp>
      <div>
        <NavLink to="/login">
          <h3>Have an account? Login</h3>
        </NavLink>
      </div>
    </SignUpContainer>
  );
};

export default SignUpPage;
