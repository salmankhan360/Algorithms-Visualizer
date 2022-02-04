import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomePng from "../../../assets/Home.png";
import TargetPng from "../../../assets/target_PNG8.png";
import { constructNodes, visualize, resetAllNodes } from "./helpers";
import { parse } from "query-string";
import Selects from "./Selects";
import { djikstra, aStar } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";

const allAlgorithms = {
  aStar,
  djikstra,
};
const speeds = {
  fast: 3,
  slow: 10,
  medium: 5,
  "0": 0,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra";
  speed?: "fast" | "slow" | "medium" | "0";
}
interface Props {
  columns: number;
  rows: number;
}

export default function Pathfinding(props: Props) {
  const { columns, rows } = props;
  const { search } = useLocation();
  const qs: QueryProps = parse(search);
  const { algorithm = "djikstra", speed: qsSpeed = "medium" } = qs;
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: 4, y: 2 },
    finish: { x: 8, y: 10 },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleReset = (visitedInOrder: NodeType[]) => {
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree, 0);
  };

  const onFinish = () => {
    setIsSearching(false);
  };

  const handleStart = (speed: QueryProps["speed"] = "0") => {
    if (!algorithm) return;

    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    const start = tree[sX][sY];
    const finish = tree[fX][fY];

    const selectedAlgorithm = allAlgorithms[algorithm];
    const visitedInOrder = selectedAlgorithm(tree, start, finish);
    if (!visitedInOrder) return;

    setIsSearching(true);
    visualize(visitedInOrder, speeds[speed], onFinish);
  };

  useEffect(() => {
    resetAllNodes(tree, 0);
    handleStart();
  }, [tree]);

  return (
    <div className="pathfindingWrapper">
      <span
        id={"visualize"}
        style={{ display: "none" }}
        onClick={() => handleStart(qsSpeed)}
      />
      <div className="nodesLabels">
        <div className="start">
          <img src={HomePng} /> Start Node
        </div>
        <div className="unvisited">
          <span></span> UnVisited Node
        </div>
        <div className="visited">
          <span></span>Visited Node
        </div>
        <div className="shortestpath">
          <span></span>Shortest-path Node
        </div>
        <div className="wall">
          <span></span>Wall
        </div>
        <div className="finish">
          {" "}
          <img src={TargetPng} />
          Target Node
        </div>
      </div>
      <div className="pathfindingContainer">
        <Tree
          tree={tree}
          setTree={setTree}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        <Selects />
      </div>
    </div>
  );
}
