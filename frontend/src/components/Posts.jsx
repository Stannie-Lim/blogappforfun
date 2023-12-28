import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Divider } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/blog_posts"
        );
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, []);

  return (
    <Grid
      container
      style={{ border: "1px solid black", padding: "32px 0" }}
      direction="column"
      alignItems="center"
      spacing={4}
    >
      {posts.map((post) => (
        <Grid item key={post.id}>
          <Paper variant="outlined" sx={{ width: 500 }}>
            <Grid container item direction="column">
              <Grid item>
                <img src={post.imageURL} alt="" style={{ maxWidth: "100%" }} />
                <div style={{ padding: "0 8px 8px 8px" }}>
                  <Typography variant="h5" fontWeight={600}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" style={{ marginTop: 8 }}>
                    {dayjs(post.createdAt).format("MMMM DD, YYYY")}
                  </Typography>
                </div>
              </Grid>
              <Grid item>
                <Divider />
              </Grid>
              <Grid item style={{ padding: 8 }}>
                <Typography>{post.description}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
