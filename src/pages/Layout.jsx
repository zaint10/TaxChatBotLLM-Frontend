import React from "react";
import Navbar from "../components/Navbar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div>
      {authUser && <Navbar authUser={authUser} onSignOut={handleSignOut} />}
      {children}
    </div>
  );
};

export default Layout;
