import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Node from "./Node";
import { constructNodes, visualize, resetAllNodes } from "./helpers";
import { parse } from "query-string";
import { djikstra, aStar } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import Tree from "./Tree";

const allAlgorithms = {
  aStar,
  djikstra,
};
const speeds = {
  fast: 3,
  slow: 10,
  medium: 5,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra";
  speed?: "fast" | "slow" | "medium";
}
interface Props {
  columns: number;
  rows: number;
}

export default function Pathfinding(props: Props) {
  const { columns, rows } = props;
  const { search } = useLocation();
  const qs: QueryProps = parse(search);
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: 4, y: 2 },
    finish: { x: 8, y: 30 },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleReset = (visitedInOrder: NodeType[]) => {
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree);
  };

  const onFinish = () => {
    setIsSearching(false);
  };

  const handleStart = () => {
    const { algorithm = "djikstra", speed = "medium" } = qs;
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

  return (
    <div className="pathfindingContainer">
      <button
        style={{ marginBottom: "30px" }}
        onClick={handleStart}
        disabled={isSearching}
      >
        Start
      </button>
      <Tree
        tree={tree}
        setTree={setTree}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
    </div>
  );
}
