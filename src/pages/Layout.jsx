import React from "react";
import Navbar from "../components/Navbar";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { useAuthUserWrapper } from "../context/UserContext";


const Layout = ({ children }) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  // const authUser = useAuthUser();
  const {authUser} = useAuthUserWrapper();
  // console.log('Layout', authUser);

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
