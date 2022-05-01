import React from "react";
import { Button, Slider, Typography, Box, Grid } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GestureIcon from '@mui/icons-material/Gesture';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import noBombPNG from "../../../assets/no-bomb.png";
import bombPNG from "../../../assets/bomb.png";
import { parse, stringify } from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

interface PropsType {
  isChanged: boolean;
  isSearching: boolean;
  isBomb: boolean;
  onReset: () => void;
  onStart: () => void;
  onDrawPattern: () => void;
  onToggleBomb: () => void;
}

export default function Actions(props: PropsType) {
  const location = useLocation();
  const navigate = useNavigate();
  const qs: any = parse(location.search);
  const { size = 30, speed = -20 } = qs;

  const {
    onReset,
    onStart,
    onDrawPattern,
    onToggleBomb,
    isChanged,
    isSearching,
    isBomb,
  } = props;

  const handleSliderChange = (type: string, val: number) => {
    const newQs = { ...qs, [type]: val };
    navigate(`${location.pathname}?${stringify(newQs)}`);
  };
  return (
    <Box maxWidth={1600} margin="auto">
      <Grid container alignItems={"center"}>
        <Grid item xs={12} sm={12} md={6}lg={4}>
          <Box pl={"20px"} pr={"30px"}>
            <Box sx={{ minWidth: "100%" }}>
              <Typography>Speed</Typography>
              <Slider
                value={speed}
                min={-70}
                max={-1}
                valueLabelDisplay="auto"
                valueLabelFormat={(val)=> `${Math.abs(val)}ms`}
                onChange={(_e, val: any) => handleSliderChange("speed", val)}
                disabled={isSearching}
              />
              <input
                type="text"
                style={{ display: "none" }}
                value={speed}
                id={"speed"}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}md={7}lg={4} sx={{minWidth: "max-content"}}>
          <div style={{minWidth: "max-content"}}>
            <Button
              onClick={onStart}
              variant="contained"
              color="success"
              sx={{ mb: "5px", marginRight: "10px" }}
              disabled={isSearching}
              startIcon={<PlayArrowIcon/>}
            >
              Start
            </Button>
            <Button
              onClick={onDrawPattern}
              variant="contained"
              className="themeButton"
              sx={{ mb: "5px" }}
              disabled={isSearching}
              startIcon={<GestureIcon/>}
            >
              Draw Maze
            </Button>

            <Button
              onClick={onToggleBomb}
              variant="contained"
              sx={{ mb: "5px", marginRight: "10px" }}
              disabled={isSearching}
              color={isBomb ? "error" : "secondary"}
              startIcon={<img src={isBomb ? noBombPNG: bombPNG}  />}
            >
              {isBomb ? "Remove" : "Add"} Bomb
            </Button>
            <Button
              onClick={onReset}
              color="error"
              variant="contained"
              sx={{ "&>div": { padding: "10px" }, mb: "5px" }}
              id="reset"
              disabled={!isChanged}
              startIcon={<RestartAltIcon/>}
            >
              Reset
            </Button>
          </div>
        </Grid>

        <Grid item xs={12} sm={12}md={6} lg={4}>
          <Box pl={"20px"} pr={"30px"}>
            <Box sx={{ minWidth: "100%" }}>
              <Typography>Box Size</Typography>
              <Slider
                value={size}
                max={70}
                min={15}
                valueLabelDisplay="auto"
                valueLabelFormat={(val)=> `${val}px`}
                onChange={(e, val: any) => handleSliderChange("size", val)}
                disabled={isSearching}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
