import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { constructNodes, visualize, resetAllNodes } from "./helpers";
import { parse } from "query-string";
import Selects from "./Selects";
import { djikstra, aStar } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";
import NodeInfo from "./NodeInfo";
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
  const [isVisualized, setVisualized] = useState(false);
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
    setVisualized(true);
    if (!algorithm || isSearching) return;

    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    const copyTree = tree.map((row) => row.map((node) => ({ ...node })));
    const start = copyTree[sX][sY];
    const finish = copyTree[fX][fY];

    const selectedAlgorithm = allAlgorithms[algorithm];
    const visitedInOrder = selectedAlgorithm(copyTree, start, finish);
    if (!visitedInOrder) return;

    setIsSearching(true);
    resetAllNodes(tree, 0);
    visualize(visitedInOrder, speeds[speed], onFinish);
  };

  useEffect(() => {
    if (!isVisualized) return;
    resetAllNodes(tree, 0);
    handleStart("0");
  }, [tree]);

  return (
    <div className="pathfindingWrapper">
    <NodeInfo /> 
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
