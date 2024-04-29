// src/components/Login/Login.js
import React from "react";
import { TextField, Button, Container, Box } from "@mui/material";

const Login = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    onSubmit(username.value, password.value);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
