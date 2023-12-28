import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Container,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

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
  const navigate = useNavigate();

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

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, posts]);

  useEffect(() => {
    const getPosts = async () => {
      if (shouldFetch) {
        try {
          await fetchPosts(offset, (data) => {
            const { posts: fetchedPosts, hasNext } = data;

            if (!hasNext) {
              setShouldFetch(false);

              if (ref.current) {
                observer.unobserve(ref.current);
              }
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

  const navigateTo = (postId) => {
    navigate("/blog/" + postId);
  };

  return (
    <Grid container item direction="column" alignItems="center" spacing={4}>
      {posts.map((post, index) => {
        const didSlice = post.description.length >= 150;
        const description = post.description
          .slice(0, 150)
          .concat(didSlice ? "..." : "");

        return (
          <Grid item key={post.id}>
            <Paper variant="outlined" sx={{ width: 500 }}>
              <Grid container item direction="column">
                <Grid item>
                  <img
                    onClick={() => navigateTo(post.id)}
                    src={post.imageURL}
                    alt=""
                    style={{ maxWidth: "100%", cursor: "pointer" }}
                  />
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
                  <Markdown
                    className="markdown"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: (props) => <Typography {...props} />,
                    }}
                  >
                    {description}
                  </Markdown>
                  {didSlice ? (
                    <Button
                      endIcon={<DoubleArrowIcon />}
                      onClick={() => navigateTo(post.id)}
                    >
                      Read more
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
              <div ref={index === posts.length - 1 ? ref : null} />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
