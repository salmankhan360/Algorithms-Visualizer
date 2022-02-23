import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import GithubLogo from "../../assets/github.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Tooltip,
  Stack,
  Slider,
} from "@mui/material";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import songs from "../../assets";
import swapEffect from "../../assets/swap.mp3";
import { useAudioPlayer } from "react-use-audio-player";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import IconButton from "@mui/material/IconButton";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { parse } from "query-string";
const pages = [
  { name: "Home", path: "/" },
  { name: "PathFinding", path: "/pathfinding" },
  { name: "Sorting", path: "/sorting" },
];

const Header = () => {
  // This component is a bit dirty becaue of overiding MUI
  const [volume, setVolume] = React.useState(50);
  const [song, setSong] = React.useState(0);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { visualizing: qsVisualizing }: any = parse(search);
  const isVisualizing =
    qsVisualizing == undefined ? false : qsVisualizing == "true";
  const {
    volume: setPlayerVol,
    load,
    playing,
    togglePlayPause,
  } = useAudioPlayer();

  useEffect(
    () =>
      load({
        src: songs[song],
        autoplay: true,
      }),
    [song]
  );
  React.useEffect(() => {
    const vol = (volume / 100) * 1;
    const swapTag: any = document.getElementById("swap");
    swapTag.volume = vol;
    setPlayerVol(vol);
  }, [volume]);

  const handleVisualize = () => {
    const startBtn: any = document.getElementById("visualize");
    startBtn.click();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#161b22", opacity: 1 }}>
      <audio src={swapEffect} style={{ display: "none" }} id="swap"></audio>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            onClick={() => !isVisualizing && navigate("/")}
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
                  "&.Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                onClick={() => navigate(path)}
                disabled={isVisualizing}
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
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
              disabled={isVisualizing}
            >
              Visualize
            </Button>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: "10px",
              "&  *": { color: "#fff" },
            }}
          >
            <IconButton
              onClick={() =>
                song !== 0 ? setSong(song - 1) : setSong(songs.length - 1)
              }
            >
              <FastRewindRounded />
            </IconButton>
            <IconButton onClick={togglePlayPause}>
              {!playing ? <PlayArrowRounded /> : <PauseRounded />}
            </IconButton>
            <IconButton
              onClick={() => (songs[song + 1] ? setSong(song + 1) : setSong(0))}
            >
              <FastForwardRounded />
            </IconButton>
          </Box> */}
          {/* <Stack
            spacing={2}
            direction="row"
            sx={{ minWidth: "170px", mr: "50px", "& *": { m: "0 !important" } }}
            alignItems="center"
          >
            <IconButton sx={{ color: "#fff" }} onClick={() => setVolume(0)}>
              <VolumeDown />
            </IconButton>
            <Slider
              aria-label="Volume"
              sx={{ color: "rgb(72, 80, 90)", margin: "0 5px !important" }}
              value={volume}
              onChange={(_: any, val: any) => setVolume(val)}
            />
            <IconButton sx={{ color: "#fff" }} onClick={() => setVolume(100)}>
              <VolumeUp />
            </IconButton>
          </Stack> */}
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
