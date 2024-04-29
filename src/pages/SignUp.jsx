import React from "react";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  const handleSubmit = (email, password) => {
    console.log("Submitting login with:", { email, password });
  };

  return (
    <div>
      <SignUp onSubmit={handleSubmit}></SignUp>
    </div>
  );
};

export default SignUpPage;
