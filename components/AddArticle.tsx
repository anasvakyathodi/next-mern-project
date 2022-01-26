import * as React from "react";
import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
} from "@mui/material";
import axios from "./../configs/axios";
import { getTableData } from "../actions/users";
import { useDataLayerValue } from "./../context/DataLayer";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  m: "1rem 0",
};

interface Props {
  open: boolean;
  handleClose: () => void;
}
export default function AddArticle({ open, handleClose }: Props) {
  const [{}, dispatch] = useDataLayerValue();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    console.log(data.get("title"), data.get("content"));
    await axios
      .post("/articles/create", {
        title: data.get("title"),
        content: data.get("content"),
      })
      .then((res) => {
        handleClose();
        getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Create an Article
            </Typography>
            <TextField
              id="title"
              label="title"
              name="title"
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              id="content"
              name="content"
              label="Content"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter Content Here"
              sx={textFieldStyle}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
