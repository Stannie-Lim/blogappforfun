import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

import { useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../UserContext";

import axios from "axios";
import dayjs from "dayjs";

import { PostModal } from "./PostModal";

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

export const MainPagePost = ({ post, disablebuttons }) => {
  const navigateTo = useNavigate();

  const didSlice = post.description.length >= 150;
  const description = post.description
    .slice(0, 150)
    .concat(didSlice ? "..." : "");

  return (
    <Paper variant="outlined" sx={{ width: 500 }}>
      <Grid container item direction="column">
        <Grid item>
          <img
            onClick={() => (disablebuttons ? null : navigateTo(post.id))}
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
              onClick={() => (disablebuttons ? null : navigateTo(post.id))}
            >
              Read more
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [offset, setOffset] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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

  const deletePost = async (post) => {
    try {
      await axios.delete(`http://localhost:3000/api/blog_posts/${post.id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });

      setPosts(posts.filter((p) => p.id !== post.id));
      setDeleteModalOpen(null);
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (inputs) => {
    try {
      const edited = await axios.patch(
        `http://localhost:3000/api/blog_posts/${inputs.id}`,
        inputs,
        {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        }
      );

      setPosts(posts.map((p) => (p.id === edited.id ? edited : p)));
      setEditModalOpen(null);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (inputs) => {
    console.log(inputs);
  };

  return (
    <Grid container item direction="column" alignItems="center" spacing={4}>
      <Grid item>
        <Button onClick={() => setCreateModalOpen(true)} endIcon={<AddIcon />}>
          Create post
        </Button>
      </Grid>
      {posts.map((post, index) => {
        return (
          <Grid item key={post.id}>
            <Grid container item>
              <MainPagePost post={post} />
              <div ref={index === posts.length - 1 ? ref : null} />
              <Grid item>
                <IconButton onClick={() => setEditModalOpen(post)}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => setDeleteModalOpen(post)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        );
      })}

      {createModalOpen && (
        <PostModal
          onClose={() => setCreateModalOpen(false)}
          post={editModalOpen}
          onSubmit={(inputs) => createPost(inputs)}
        />
      )}

      {editModalOpen && (
        <PostModal
          isEdit
          onClose={() => setEditModalOpen(null)}
          post={editModalOpen}
          onSubmit={(inputs) => editPost(inputs)}
        />
      )}

      {deleteModalOpen && (
        <Dialog open={true} onClose={() => setDeleteModalOpen(null)}>
          <DialogTitle>Delete post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(null)}>Cancel</Button>
            <Button onClick={() => deletePost(deleteModalOpen)}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};
