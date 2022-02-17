import React from "react";
import GithubLogo from "../../assets/github.png";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Tooltip,
} from "@mui/material";

const pages = [
  { name: "Home", path: "/" },
  { name: "PathFinding", path: "/pathfinding" },
  { name: "Sorting", path: "/sorting" },
];

const Header = () => {
  const navigate = useNavigate();
  const handleVisualize = () => {
    const startBtn: any = document.getElementById("visualize");
    startBtn.click();
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#161b22", opacity: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              marginRight: "80px",
              cursor: "pointer",
            }}
          >
            Visualiser
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, path }) => (
              <Button
                key={path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "17px",
                  margin: "0px 10px",
                }}
                onClick={() => navigate(path)}
              >
                {name}
              </Button>
            ))}
            <Button
              variant="contained"
              onClick={handleVisualize}
              sx={{
                fontSize: "17px",
                marginLeft: "30px",
                backgroundColor: "#48505a",
                "&:hover": { backgroundColor: "rgba(72, 80, 90, .8)" },
              }}
            >
              Visualize
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, height: "45px" }}>
            <a
              href="https://github.com/Shutah64/Algorithms-Visualizer"
              target="_blank"
            >
              <Tooltip title={"Github Repository"}>
                <img src={GithubLogo} height={"100%"} />
              </Tooltip>
            </a>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
