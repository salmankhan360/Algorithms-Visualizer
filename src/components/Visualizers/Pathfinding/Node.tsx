import React from "react";
import { NodeType } from "../../../Types";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import HomePng from "../../../assets/Home.png";
import TargetPng from "../../../assets/target_PNG8.png";
import BombPng from "../../../assets/bomb.png";

const Icons = {
  start: HomePng,
  finish: TargetPng,
  bomb: BombPng,
  "": "",
};

interface Props extends NodeType {
  handleNodeClick: (x: number, y: number, eventType?: string) => void;
}

export default function Node(props: Props) {
  const { x, y, isStart, isFinish, isWall, isBomb, handleNodeClick } = props;
  const { search } = useLocation();
  const { speed = 20, size = 30 } = parse(search);
  const nodeState = isBomb
    ? "bomb"
    : isStart
    ? "start"
    : isFinish
    ? "finish"
    : "";

  const boxSize = Number(size) > 16 ? size : 16;
  const sizePX = `${boxSize}px`;
  const animationDuration =` ${Math.abs(Number(speed)) * 100}ms`
  return (
    <div
      className="boxWrapper"
      style={{ height: sizePX, width: sizePX }}
      onMouseDown={() => handleNodeClick(x, y, "onMouseDown")}
      onMouseUp={() => handleNodeClick(x, y, "onMouseUp")}
      onMouseOver={() => handleNodeClick(x, y, "onMouseOver")}
    >
      <div
        className={`box ${isWall ? "" : ""}`}
        id={`${x}-${y}`}
        style={{
          pointerEvents: "none",
          animationDuration
        }}
      >
        {Icons[nodeState] && (
          <img
            id={nodeState}
            height={sizePX}
            style={{
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
