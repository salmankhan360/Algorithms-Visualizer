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

import AudioPlayer from "./AudioPlayer";
const pages = [
  { name: "Home", path: "/" },
  { name: "PathFinding", path: "/pathfinding#pathfinding" },
  { name: "Sorting", path: "/sorting#sorting" },
];

const Header = () => {
  const goTo = useNavigate();

  const navigate = (path: string) => {
    document.getElementById("reset")?.click();
    goTo(path);
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
            Visualizer
          </Typography>

          <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
            {pages.map(({ name, path }) => (
              <Button
                key={path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "17px",
                  margin: "0px 10px",
                  "&.Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                onClick={() => navigate(path)}
              >
                {name}
              </Button>
            ))}
          </Box>
          <AudioPlayer />
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
