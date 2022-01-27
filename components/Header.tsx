import {
  Container,
  AppBar,
  Toolbar,
  Tooltip,
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDataLayerValue } from "../context/DataLayer";
import { handleLogout } from "../actions/users";

const Header = () => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [{ user }] = useDataLayerValue();

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): any => {
    setAnchorElUser(null);
  };

  const handleClick = async (): Promise<any> => {
    try {
      await handleLogout(router);
      handleCloseUserMenu();
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  const logoStyle = {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "50%",
    border: "4px solid #73BBBF",
    position: "absolute",
    top: "-38%",
    left: "2%",
  };

  const appBarStyle = {
    color: "#73BBBF",
    mt: "2rem",
    backgroundColor: "#fff",
    boxShadow: "none",
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ backgroundColor: "#CCF2F4", borderRadius: "20px" }}
        >
          <Box component="div" sx={logoStyle}>
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
              <MenuItem key={"logout"} onClick={handleClick}>
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
