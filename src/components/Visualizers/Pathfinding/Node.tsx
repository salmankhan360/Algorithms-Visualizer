import React from "react";
import { NodeType } from "../../../Types";
import HomePng from "../../../assets/Home.png";
import TargetPng from "../../../assets/target_PNG8.png";

const Icons = {
  start: HomePng,
  finish: TargetPng,
  "": "",
};

interface Props extends NodeType {
  handleNodeClick: (x: number, y: number, eventType?: string) => void;
}

export default function Node(props: Props) {
  const { x, y, isStart, isFinish, isWall, handleNodeClick } = props;

  const nodeState = isStart ? "start" : isFinish ? "finish" : "";
  return (
    <div
      className="boxWrapper"
      onMouseDown={() => handleNodeClick(x, y, "onMouseDown")}
      onMouseUp={() => handleNodeClick(x, y, "onMouseUp")}
      onMouseOver={() => handleNodeClick(x, y, "onMouseOver")}
    >
      <div
        className={`box ${isWall ? "wall-node" : ""}`}
        id={`${x}-${y}`}
        style={{ pointerEvents: "none" }}
      >
        {Icons[nodeState] && (
          <img
            id={nodeState}
            height={"30px"}
            style={{
              backgroundColor: "#fff",
              userSelect: "none",
              pointerEvents: "none",
            }}
            src={Icons[nodeState]}
          />
        )}
      </div>
    </div>
  );
}
