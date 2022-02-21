import React from "react";
import { Button } from "@mui/material";

interface PropsType {
  isChanged: boolean;
  onReset: () => void;
  onDrawPattern: () => void;
}
export default function Actions(props: PropsType) {
  const { onReset, onDrawPattern, isChanged } = props;

  return (
    <div>
      <Button
        onClick={onDrawPattern}
        variant="contained"
        className="themeButton"
      >
        Draw Pattern
      </Button>
      {isChanged && (
        <Button
          onClick={onReset}
          color="error"
          variant="contained"
          sx={{ "&>div": { padding: "10px" }, marginLeft: "20px" }}
        >
          Reset
        </Button>
      )}
    </div>
  );
}
