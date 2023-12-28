import React, { useEffect, useState, useRef } from "react";
import { Paper, Typography, Grid, Divider, Container } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const NUM_PER_FETCH = 3;

const fetchPosts = async (offset, callback) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/blog_posts?limit=${NUM_PER_FETCH}&offset=${
        offset * NUM_PER_FETCH
      }`
    );

    callback(data);
  } catch (error) {
    throw error;
  }
};

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(true);

  const ref = useRef(null);

  const scrolled = async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setOffset(offset + 1);
    }
  };
  const observer = new IntersectionObserver(scrolled);

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.unobserve(ref?.current);
  }, [ref, posts]);

  useEffect(() => {
    const getPosts = async () => {
      if (shouldFetch) {
        try {
          await fetchPosts(offset, (data) => {
            const { posts: fetchedPosts, hasNext } = data;

            if (!hasNext) {
              setShouldFetch(false);
              observer.unobserve(ref?.current);
            }
            setPosts([...posts, ...fetchedPosts]);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPosts();
  }, [offset]);

  return (
    <Grid container item direction="column" alignItems="center" spacing={4}>
      {posts.map((post, index) => (
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
            <div ref={index === posts.length - 1 ? ref : null} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
