import React, { useEffect } from "react";
import { getHeight, genRandomArray } from "./helpers";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { visualize } from "./helpers";
import SelectSettings from "../../../shared_components/SelectSettings";
import bubbleSort from "../../../Algorithms/Sorting/BubbleSort";
import mergeSort from "../../../Algorithms/Sorting/MergeSort";
import "./styles.css";

const speeds: any = {
  fast: 30,
  slow: 100,
  medium: 70,
};
export default function Sorting() {
  const [array, setArray] = React.useState(genRandomArray(30, 100));
  const [visualizing, setVisualizing] = React.useState(false);
  const { search } = useLocation();
  const { size = "40", speed = "medium" }: any = parse(search);
  const max = Math.max(...array);

  useEffect(() => {
    if (size > 40) return;
    setArray(genRandomArray(size, 100));
  }, [size]);

  const onFinish = () => {
    setVisualizing(false);
  };
  const handleClick = () => {
    if (visualizing) return;
    setVisualizing(true);
    const loopSpeed = speeds[speed];
    const inOrder = bubbleSort(array.slice());
    visualize(inOrder, loopSpeed, setArray, onFinish);
  };
  return (
    <div>
      <button
        style={{ marginBottom: "30px" }}
        onClick={handleClick}
        id="visualize"
      ></button>

      <div className="sortingContainer">
        <div className="sortingContent">
          {array.map((val, i) => {
            const color = `lightblue`;
            return (
              <div
                className="bar"
                style={{
                  height: `calc(${getHeight(val, max)}% + 20px)`,
                  backgroundColor: color,
                }}
                id={`${i}`}
              >
                <span>{val}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Box marginTop="30px">
        <SelectSettings
          isChanged={true}
          feilds={{
            speed: ["slow", "medium", "fast"],
            algorithm: ["Bubble Sort", "Merge Sort"],
            size: ["10", "30", "40"],
          }}
          onReset={() => setArray(genRandomArray(size, 100))}
          resetText={"Generate"}
        />
      </Box>
    </div>
  );
}
