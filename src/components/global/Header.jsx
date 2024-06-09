import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { InputOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, TextField, useMediaQuery } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SearchDropDown from "./SearchDropDown";
import SearchItemWrapper from "./SearchItemWrapper";

const pages = [
  {
    title: "My Team",
    route: "/my-team",
  },
  {
    title: "Create Team",
    route: "/create-team",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route) => {
    setAnchorElNav(null);
    navigate(route);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccerIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "darkorange",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            FootballHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCloseNavMenu(page?.route)}
                >
                  <Typography textAlign="center">{page?.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SportsSoccerIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "darkorange",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            FootballHub
          </Typography>

          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", gap: "15px" },
              }}
            >
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => handleCloseNavMenu(page?.route)}
                  variant={index == 1 ? "contained" : "outlined"}
                  startIcon={index === 1 ? <AddIcon /> : <GroupsIcon />}
                  sx={{
                    color: "white",
                    backgroundColor: index == 1 ? "darkorange" : "",
                    "&:hover": {
                      backgroundColor: index == 1 ? "darkorange" : "",
                    },
                  }}
                >
                  {page?.title}
                </Button>
              ))}
            </Box>
            <Tooltip title="Search here...">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", width: "500px" }}
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
              PaperProps={{
                style: {
                  maxHeight: "500px",
                  width: isMobile ? "90vw" : "600px",
                },
              }}
            >
              <MenuItem>
                <SearchItemWrapper handleCloseUserMenu={handleCloseUserMenu} />
              </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
