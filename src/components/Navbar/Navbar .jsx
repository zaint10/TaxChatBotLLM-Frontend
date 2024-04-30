import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography, Radio } from "@mui/material";
import styled from "@emotion/styled";

const StyledAppBar = styled(AppBar)`
  && {
    position: static;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Navigation = styled.nav`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Navbar = ({ authUser, onSignOut }) => {
  return (
    <StyledAppBar>
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tax Chat Bot LLM
        </Typography>
        <Navigation>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chats">Chats</NavLink>
        </Navigation>
        <UserContainer>
          <Typography variant="body1" component="div">
            {authUser.email}
          </Typography>
          <Button color="secondary" variant="contained" onClick={onSignOut}>
            Logout
          </Button>
          <NavLink to="/get-qr-code">
            <Button color="secondary" variant="contained" onClick={onSignOut} disabled={authUser.is_2fa_enabled}>
              Enable 2FA
            </Button>
            
          </NavLink>
        </UserContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
