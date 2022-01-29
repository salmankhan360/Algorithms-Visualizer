import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Node from "./Node";
import { constructNodes, visualize, resetAllNodes } from "./helpers";
import { parse } from "query-string";
import { djikstra, aStar } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";

const allAlgorithms = {
  aStar,
  djikstra,
};
const speeds = {
  fast: 20,
  slow: 90,
  medium: 40,
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
  const [isClicked, setIsClicked] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleReset = (visitedInOrder: NodeType[]) => {
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree);
  };

  const onFinish = () => {
    setIsSearching(false);
  };

  const handleStart = () => {
    const { algorithm, speed = "medium" } = qs;
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

  const handleNodeClick = (x: number, y: number) => {
    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    if ((sX == x && sY == y) || (fX == x && fY == y)) return;
    const node = tree[x][y];
    const changedNode = { ...node, isWall: !node.isWall };
    const changedTree = tree.slice();
    changedTree[x][y] = changedNode;
    setTree(changedTree);
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
      <div
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
      >
        {tree.map((row, y) => (
          <div className={"row"} id={`row-${y}`}>
            {row.map((node, x) => (
              <Node
                key={`${y}-${x}`}
                handleNodeClick={handleNodeClick}
                isClicked={isClicked}
                {...node}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
