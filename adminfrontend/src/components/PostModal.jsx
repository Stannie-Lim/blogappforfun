import React, { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { MainPagePost } from "./Posts";
import { SingleBlogPost } from "./SingleBlogPost";

export const PostModal = ({ onClose, post, isEdit, onSubmit }) => {
  const [inputs, setInputs] = useState(post);
  const [view, setView] = useState("main");

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>{isEdit ? "Edit post" : "Create post"}</DialogTitle>
      <DialogContent>
        <Grid
          container
          justifyContent="space-between"
          spacing={4}
          style={{ marginTop: 1 }}
        >
          <Grid container item direction="column" xs spacing={2}>
            <Grid item>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={inputs.title}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Description"
                multiline
                rows={10}
                fullWidth
                name="description"
                value={inputs.description}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item>
              <ButtonGroup variant="outlined">
                <Button onClick={() => setView("main")}>Main page</Button>
                <Button onClick={() => setView("detailed")}>
                  Detailed page
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              {view === "main" ? (
                <MainPagePost post={inputs} disablebuttons />
              ) : (
                <SingleBlogPost inputPost={inputs} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(inputs)}>
          {isEdit ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
