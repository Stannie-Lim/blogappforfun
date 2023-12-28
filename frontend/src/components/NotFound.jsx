import React from "react";
import { Typography, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Banner } from "./Blog";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Grid container direction="column">
      <Banner />
      <Grid container item spacing={2} alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h2">404</Typography>
        </Grid>
        <Grid item style={{ width: "30%" }}>
          <Divider />
        </Grid>
        <Grid item>
          <Typography
            onClick={() => navigate("/blog")}
            style={{ cursor: "pointer" }}
          >
            Click here to return to blog page
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
