import React, { useEffect } from "react";
import Login from "../components/Login";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import apiService from "../service/apiService";
import { useSnackbar } from "../context/SnackbarContext";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
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

const LoginPage = () => {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);
  console.log("REACT_Z_NAME", process.env.REACT_APP_Z_NAME);
  console.log("NODE_ENV", process.env.NODE_ENV);

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
      <div>
        <NavLink to="/signup">
          <h3>Don't have an acocunt?</h3>
        </NavLink>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
