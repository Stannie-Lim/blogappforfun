import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";

import { Posts } from "./Posts";

const BANNER_IMAGE =
  "https://www.luxlvl.com/our-blog/wp-content/uploads/sites/3/2021/03/Bell-Canyon-Real-Estate-Twilight.jpg";

export const Banner = () => {
  return (
    <div style={{ marginBottom: 265 }}>
      <div
        style={{
          height: 300,
          position: "absolute",
          top: 0,
          zIndex: -1,
          width: "100%",
          backgroundImage: `url(${BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        {/* <img src={BANNER_IMAGE} alt="banner_image" width="100%" height="100%" /> */}
        <Typography
          variant="h2"
          fontWeight={600}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
          }}
        >
          Blog
        </Typography>
      </div>
    </div>
  );
};

export const Blog = () => {
  return (
    <Grid container direction="column">
      <Banner />
      <Grid item>
        <Posts />
      </Grid>
    </Grid>
  );
};
