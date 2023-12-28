import React, { useContext } from "react";
import { Grid } from "@mui/material";

import { UserContext } from "../UserContext";

import { Posts } from "./Posts";

export const AdminPage = () => {
  const { user } = useContext(UserContext);

  return (
    <Grid container>
      <Posts />
    </Grid>
  );
};
