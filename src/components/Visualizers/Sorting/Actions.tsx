import React from "react";
import SelectSettings from "../../../shared_components/SelectSettings";
import { Button, Box } from "@mui/material";

interface PropsType {
  visualizing: boolean;
  handleNewArr: () => void;
}
export default function Actions(props: PropsType) {
  const { visualizing, handleNewArr } = props;
  return (
    <Box className="flexCenter" marginTop="30px">
      <SelectSettings
        feilds={{
          speed: ["slow", "medium", "fast"],
          algorithm: ["bubble sort", "quick sort", "merge sort"],
          size: ["30", "40", "20"],
        }}
        disabled={visualizing}
      />

      <Button
        variant="contained"
        className={"themeButton"}
        onClick={handleNewArr}
        disabled={visualizing}
      >
        Generate
      </Button>
    </Box>
  );
}
