import React, { useState } from "react";

import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const PostModal = ({ onClose, post, isEdit, onSubmit }) => {
  const [inputs, setInputs] = useState(post);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{isEdit ? "Edit post" : "Create post"}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
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
