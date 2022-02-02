import React from "react";
import { getHeight, genRandomArray } from "./helpers";
import { bubbleSort } from "../../../Algorithms/Sorting/BubbleSort";
import "./styles.css";
export default function Sorting() {
  const [array, setArray] = React.useState(genRandomArray(30, 100));

  const max = Math.max(...array);

  const visualize = () => {
    const inOrder = bubbleSort(array);
    console.log(inOrder);
    inOrder.forEach((node: any, i) => {
      setTimeout(() => {
        const {
          pile,
          changing: [_, j],
        } = node;
        const curr: any = document.getElementById(j);
        const prev: any = document.getElementById(
          String(inOrder[i].changing[1])
        );
        prev.style.backgroundColor = "#fff";
        curr.style.backgroundColor = "yellow";
        // console.log(pile);
        setArray(pile);
      }, i * 100);
    });
  };
  return (
    <div>
      <button style={{ marginBottom: "30px" }} onClick={visualize}>
        SOrt
      </button>
      <div className="sortingContainer">
        <div className="sortingContent">
          {array.map((val, i) => (
            <div
              className="bar"
              style={{ height: `calc(${getHeight(val, max)}% + 20px)` }}
              id={`${i}`}
            >
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
