import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BookIcon from "@mui/icons-material/Book";

import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const anchor = "right";
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const onSelect = (value) => {
    switch (value) {
      case "Blog":
        navigate("/blog");
        break;
      case "Home":
        navigate("/");
        break;
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, zIndex: 1 }}>
        <AppBar
          elevation={0}
          position="static"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.3)", color: "white" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => onSelect("Home")}
            >
              Blog App
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(anchor, false)}
        PaperProps={{
          sx: {
            backgroundColor: "lightgrey",
            color: "white",
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {["Blog"].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => onSelect(text)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
