import React from "react";
import SelectSettings from "../../../shared_components/SelectSettings";
import { Button, Box } from "@mui/material";

interface PropsType {
  visualizing: boolean;
  handleNewArr: () => void;
  handleClearTimeouts: () => void;
}
export default function Actions(props: PropsType) {
  const { visualizing, handleNewArr, handleClearTimeouts } = props;
  return (
    <Box className="flexCenter" marginTop="30px" minWidth="max-content">
      <SelectSettings
        feilds={{
          speed: ["slow", "medium", "fast"],
          algorithm: [
            "bubble sort",
            "quick sort",
            "merge sort",
            "insertion sort",
            "selection sort",
          ],
          size: ["25", "30", "15"],
        }}
        disabled={visualizing}
      />

      <Button
        variant="contained"
        className={"themeButton"}
        onClick={handleNewArr}
        disabled={visualizing}
        sx={{
          mr: "10px",
          mb: "15px",
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        Generate
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleClearTimeouts}
        disabled={!visualizing}
        id="reset"
        sx={{
          mb: "15px",
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        Reset
      </Button>
    </Box>
  );
}
