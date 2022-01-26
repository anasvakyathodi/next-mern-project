import { NextComponentType } from "next";

import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDataLayerValue } from "../context/DataLayer";

const Header = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [{ user }] = useDataLayerValue();

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): any => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): any => {
    setAnchorElUser(null);
  };

  const handleLogout = async (): Promise<any> => {
    try {
      handleCloseUserMenu();
      await axios.post("/users/logout");
      localStorage.removeItem("token");
      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        color: "#73BBBF",
        mt: "2rem",
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ backgroundColor: "#CCF2F4", borderRadius: "20px" }}
        >
          <Box
            component="div"
            sx={{
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "50%",
              border: "4px solid #73BBBF",
              position: "absolute",
              top: "-38%",
              left: "2%",
            }}
          >
            <Image src="/logo2.png" height="75" width="73" />
          </Box>
          <Box sx={{ flex: 1 }}></Box>
          <Box sx={{ flexGrow: 0, display: "flex", mr: 2 }}>
            <Box component="div" sx={{ mr: "1rem" }}>
              <Typography variant="subtitle1" fontWeight="600">
                {user?.displayName}
              </Typography>
              <Typography variant="subtitle2">
                {user?.userType === "admin" ? "Admin" : "Author"}
              </Typography>
            </Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"logout"} onClick={handleLogout}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
