import React from "react";
import { NodeType } from "../../../Types";

const colors = {
  start: "#9e381f",
  finish: "#219652",
  wall: "#2e2928",
  "": "",
};

interface Props extends NodeType {
  handleNodeClick: (x: number, y: number) => void;
  isClicked: boolean;
}

export default function Node(props: Props) {
  const { x, y, isStart, isFinish, isWall, isClicked, handleNodeClick } = props;

  const nodeState = isStart
    ? "start"
    : isFinish
    ? "finish"
    : isWall
    ? "wall"
    : "";

  return (
    <div
      className="box"
      id={`${x}-${y}`}
      style={{ backgroundColor: colors[nodeState] }}
      // onClick={() => handleNodeClick(x, y)}
      onMouseUp={() => handleNodeClick(x, y)}
      onMouseDown={() => handleNodeClick(x, y)}
      onMouseOver={() => isClicked && handleNodeClick(x, y)}
      // onMouseEnter={() => handleNodeClick(x, y)}
    ></div>
  );
}
