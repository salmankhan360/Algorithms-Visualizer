import React from "react";
import { NodeType } from "../../../Types";

const colors = {
  start: "#9e381f",
  finish: "#219652",
  wall: "#2e2928",
  "": "",
};

interface Props extends NodeType {
  handleNodeClick: (x: number, y: number, eventType?: string) => void;
}

export default function Node(props: Props) {
  const { x, y, isStart, isFinish, isWall, handleNodeClick } = props;

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
      onMouseDown={() => handleNodeClick(x, y, "onMouseDown")}
      onMouseUp={() => handleNodeClick(x, y, "onMouseUp")}
      onMouseOver={() => handleNodeClick(x, y, "onMouseOver")}
      // onMouseEnter={() => handleNodeClick(x, y)}
    ></div>
  );
}
