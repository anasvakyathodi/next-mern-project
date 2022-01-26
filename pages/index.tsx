import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "./../configs/axios";
import { useEffect, useState } from "react";
import Modal from "./../components/AddArticle";
import Table from "./../components/Table";
import Header from "./../components/Header";
import { Button, Paper } from "@mui/material";
import { useDataLayerValue } from "../context/DataLayer";
import { getTableData } from "../actions/users";
import Head from "next/head";
const Home: NextPage = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getLoggedInUser = async (props: any): Promise<any> => {
    axios.defaults.headers.common["Authorization"] = props;
    await axios.get("/users/getUser").then((res) => {
      dispatch({
        type: "SET_USER",
        user: res.data.data,
      });
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getLoggedInUser(token);
      getTableData({ pageNumber: null, rowsPerPage: null }, dispatch);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <Modal open={open} handleClose={handleClose} />
      <Paper
        sx={{
          maxWidth: "80%",
          margin: "auto",
          marginTop: user.userType === "admin" ? "3.5rem" : "1rem",
        }}
        elevation={0}
      >
        {user?.userType !== "admin" ? (
          <Button variant="contained" sx={{ m: "1rem 0" }} onClick={handleOpen}>
            Add Article
          </Button>
        ) : null}
        <Table />
      </Paper>
    </div>
  );
};

export default Home;
