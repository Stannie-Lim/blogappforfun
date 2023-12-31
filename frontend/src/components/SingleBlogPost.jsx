import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Banner } from "./Blog";
import axios from "axios";
import dayjs from "dayjs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

import { NotFound } from "./NotFound";

export const SingleBlogPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/blog_posts/${id}`
        );
        setPost(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getPost();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!post.current) {
    return <NotFound />;
  }

  const { prev, current, next } = post;

  return (
    <Grid container direction="column">
      <Banner />
      <Grid container item alignItems="center" direction="column">
        <Grid container item spacing={3} style={{ width: 700, padding: 8 }}>
          <Grid item>
            <Typography variant="h5" fontWeight={600}>
              {current.title}
            </Typography>
            <Typography variant="body1" style={{ marginTop: 8 }}>
              {dayjs(current.createdAt).format("MMMM DD, YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Markdown
              className="markdown"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                p: (props) => <Typography {...props} />,
              }}
            >
              {current.description}
            </Markdown>
          </Grid>
          <Grid
            container
            item
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              {prev != null && (
                <Button
                  onClick={() => navigate(`/blog/${prev.id}`)}
                  startIcon={<ChevronLeftIcon />}
                >
                  Previous post
                </Button>
              )}
            </Grid>
            <Grid item>
              {next != null && (
                <Button
                  onClick={() => navigate(`/blog/${next.id}`)}
                  endIcon={<ChevronRightIcon />}
                >
                  Next post
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
