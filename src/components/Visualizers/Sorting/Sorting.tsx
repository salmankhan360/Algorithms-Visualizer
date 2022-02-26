import React, { useEffect } from "react";
import { getHeight, genRandomArray } from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse, stringify } from "query-string";
import { visualize, resetAllClasses, resetBars } from "./helpers";
import {
  bubbleSort,
  quickSort,
  mergeSort,
  insertionSort,
  selectionSort,
} from "../../../Algorithms/Sorting";
import Actions from "./Actions";
import "./styles.scss";
const speeds: any = {
  fast: 100,
  slow: 500,
  medium: 250,
};
const algorithms: any = {
  "bubble sort": bubbleSort,
  "quick sort": quickSort,
  "merge sort": mergeSort,
  "insertion sort": insertionSort,
  "selection sort": selectionSort,
};
export default function Sorting() {
  const [array, setArray] = React.useState(genRandomArray(30, 100));
  const [visualizing, setVisualizing] = React.useState(false);
  const { search } = useLocation();
  const [clearTimeouts, setClearTimeouts] = React.useState<any>(null);

  const {
    size = "30",
    speed = "slow",
    algorithm: qsAlgorithm = "quick sort",
  }: any = parse(search);
  const max = Math.max(...array);

  const handleNewArr = () => {
    const newArr = genRandomArray(size, max);
    resetAllClasses();
    setArray(newArr);
    return newArr;
  };

  useEffect(() => {
    if (qsAlgorithm !== "merge sort") resetBars(array);
  }, [array]);

  useEffect(() => {
    if (size > 30) return;
    handleNewArr();
  }, [size]);

  const onFinish = (finishPile: number[] = []) => {
    setVisualizing(false);
    if (finishPile.length) setArray(finishPile);
  };

  const onStart = (timeouts: any) => {
    setClearTimeouts(timeouts);
  };
  const handleClick = () => {
    if (visualizing) return;
    setVisualizing(true);
    const loopSpeed = speeds[speed];
    const algorithm = algorithms[qsAlgorithm];
    const inOrder = algorithm(array.slice());
    visualize(inOrder, loopSpeed, setArray, onFinish, onStart);
  };
  const handleClearTimeouts = () => {
    if (clearTimeouts) {
      clearTimeouts.forEach((timeout: any) => clearTimeout(timeout));
      handleNewArr();
      onFinish();
    }
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
                  transition:
                    qsAlgorithm == "merge sort"
                      ? "none"
                      : "all 200ms ease-in-out",
                }}
                id={`${i}`}
              >
                <span>{val}</span>
              </div>
            );
          })}
          <div id="innerTweek"></div>
        </div>
      </div>
      <Actions
        visualizing={!!visualizing}
        handleNewArr={handleNewArr}
        handleClearTimeouts={handleClearTimeouts}
      />
    </div>
  );
}
