import React from "react";
import GithubLogo from '../../assets/github.png';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";

const pages = ["Home", "PathFinding", "Sorting"];

const Header = () => {
  const handleVisualize = () => {
    const startBtn: any = document.getElementById("visualize");
    startBtn.click();
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: "#161b22", opacity: 1 , padding: "10px 0"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              marginRight: "80px",
              cursor: "pointer",
            }}
          >
            Visualiser
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                  margin: "0px 10px",
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="contained"
              onClick={handleVisualize}
              sx={{
                fontSize: "20px",
                marginLeft: "30px",
                backgroundColor: "#48505a",
                "&:hover": { backgroundColor: "rgba(72, 80, 90, .8)" },
              }}
            >
              Visualize
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip  title={"w"}>

            <img src={GithubLogo} height={60}/>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
