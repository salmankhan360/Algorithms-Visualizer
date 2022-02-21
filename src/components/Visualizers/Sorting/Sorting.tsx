import React, { useCallback, useEffect } from "react";
import { getHeight, genRandomArray } from "./helpers";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { visualize, resetBars } from "./helpers";
import { Button } from "@mui/material";
import SelectSettings from "../../../shared_components/SelectSettings";
import bubbleSort from "../../../Algorithms/Sorting/BubbleSort";
import quickSort from "../../../Algorithms/Sorting/QuickSort";
import mergeSort from "../../../Algorithms/Sorting/MergeSort";
import "./styles.scss";

const speeds: any = {
  fast: 100,
  slow: 500,
  medium: 250,
};
const algorithms: any = {
  "bubble sort": bubbleSort,
  "quick sort": quickSort,
};
export default function Sorting() {
  const [array, setArray] = React.useState(genRandomArray(30, 100));
  const [visualizing, setVisualizing] = React.useState(false);
  const { search } = useLocation();
  const {
    size = "30",
    speed = "medium",
    algorithm: qsAlgorithm = "quick sort",
  }: any = parse(search);
  const max = Math.max(...array);

  const handleNewArr = () =>
    !visualizing && setArray(genRandomArray(size, max));

  useEffect(() => resetBars(array), [array]);
  useEffect(() => {
    if (size > 40) return;
    handleNewArr();
  }, [size]);

  const onFinish = () => {
    setVisualizing(false);
  };

  const handleClick = () => {
    if (visualizing) return;
    setVisualizing(true);
    const loopSpeed = speeds[speed];
    const algorithm = algorithms[qsAlgorithm];
    const inOrder = algorithm(array.slice());
    resetBars(array.slice());
    visualize(inOrder, loopSpeed, setArray, onFinish);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        id="visualize"
        style={{ display: "none" }}
      ></button>

      <div className="sortingContainer">
        <div
          className="sortingContent"
          style={{ maxWidth: `${array.length * 35}px`, margin: "auto" }}
        >
          {array.map((val, i) => {
            const color = `lightblue`;
            return (
              <div
                className={`bar bar-${val}`}
                style={{
                  position: "absolute",
                  height: `calc(${getHeight(val, max)}% + 20px)`,
                  backgroundColor: color,
                  left: `${i * 35}px`,
                  // left:
                }}
                id={`${i}`}
              >
                <span>{val}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Box className="flexCenter" marginTop="30px">
        <SelectSettings
          feilds={{
            speed: ["slow", "medium", "fast"],
            algorithm: ["bubble sort", "quick sort"],
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
    </div>
  );
}
