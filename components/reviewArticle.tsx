import * as React from "react";
import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  ButtonGroup,
} from "@mui/material";
import axios from "./../configs/axios";
import { getTableData } from "../actions/users";
import { useDataLayerValue } from "./../context/DataLayer";
import { useState } from "react";
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
  data: any;
}
export default function ReviewArticle({ open, handleClose, data }: Props) {
  let id = data?._id;
  const [{}, dispatch] = useDataLayerValue();
  const [remarks, setRemarks] = useState<string>("");
  const handleChange = (event: any) => {
    setRemarks(event.target.value);
  };

  const handleSuccess = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    await axios
      .post("/articles/review", {
        id,
        remarks: remarks,
        action: "accepted",
      })
      .then((res) => {
        getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
        setRemarks("");
        handleClose();
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token ? token : "";
    await axios
      .post("/articles/review", {
        id,
        remarks: remarks,
        action: "rejected",
      })
      .then((res) => {
        getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
        setRemarks("");

        handleClose();
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
          <Box component="form" noValidate>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Review Article of {data?.authorName}
            </Typography>
            <TextField
              id="title"
              label="title"
              name="title"
              value={data?.title}
              disabled
              fullWidth
              sx={textFieldStyle}
            />
            <TextField
              id="content"
              name="content"
              label="Content"
              multiline
              rows={3}
              value={data?.content}
              disabled
              fullWidth
              placeholder="Enter Content Here"
              sx={textFieldStyle}
            />
            <TextField
              id="remark"
              name="remark"
              label="Remarks / Suggestions (Optional)"
              multiline
              onChange={handleChange}
              value={remarks}
              rows={4}
              fullWidth
              placeholder="Enter Remarks Here"
              sx={textFieldStyle}
            />
            <ButtonGroup disableElevation variant="contained">
              <Button color="success" onClick={handleSuccess}>
                Accept
              </Button>
              <Button color="error" onClick={handleReject}>
                Reject
              </Button>
            </ButtonGroup>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
