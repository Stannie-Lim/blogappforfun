import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    window.localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, zIndex: 1, marginBottom: 3 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{ backgroundColor: "rgba(32,178,170, 0.8)", color: "white" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/homepage")}
          >
            Blog App Admin
          </Typography>
          {user ? (
            <Button color="inherit" onClick={logout}>
              Log out
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
