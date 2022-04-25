import React from "react";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import IconButton from "@mui/material/IconButton";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { Box, Slider, Stack } from "@mui/material";
import songs from "../../assets";
import swapEffect from "../../assets/swap.mp3";

export default function AudioPlayer() {
  const [song, setSong] = React.useState(0);
  const [isRendered, setIsRendered] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(50);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  React.useEffect(() => {
    window.addEventListener("mousedown", () => {
      setIsRendered(true);
    });

    return () => {
      window.removeEventListener("mousedown", () => {
        setIsRendered(true);
      });
    };
  }, []);

  React.useEffect(() => {
    isRendered && setPlaying(true);
  }, [isRendered]);
  React.useEffect(() => {
    const audio: any = document.getElementById("currSound");
    playing ? audio.play() : audio.pause();
  }, [playing]);

  React.useEffect(() => {
    const audio: any = document.getElementById("currSound");
    const swapAudio: any = document.getElementById("swap");
    audio.volume = volume / 100;
    swapAudio.volume = volume / 100;
  }, [volume]);

  React.useEffect(() => {
    const audio: any = document.getElementById("currSound");
    audio.pause();
    audio.src = songs[song];
    audio.play();
  }, [song]);
  return (
    <>
      <audio src={swapEffect} style={{ display: "none" }} id="swap"></audio>
      <div
        id="audio-pauser"
        style={{ display: "none" }}
        onClick={() => setPlaying(false)}
      ></div>
      <div
        id="audio-player"
        style={{ display: "none" }}
        onClick={() => setPlaying(true)}
      ></div>
      <audio
        id="currSound"
        src={songs[song]}
        onEnded={() => {
          song == songs.length - 1 ? setSong(0) : setSong(song + 1);
        }}
      ></audio>
      <Box
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
      </Box>
      <Stack
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
      </Stack>
    </>
  );
}
