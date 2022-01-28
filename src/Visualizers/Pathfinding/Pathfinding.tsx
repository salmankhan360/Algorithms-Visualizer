import React, { useState } from "react";
import Node from "./Node";
import { constructNodes, visualize, resetAllNodes } from "./helpers";
import djikstra from "../../Algorithms/Pathfinding/Djikstra";
import { NodeType, CoordinatesType } from "../../Types";
import { table } from "console";

interface Props {
  columns: number;
  rows: number;
}

export default function Pathfinding(props: Props) {
  const { columns, rows } = props;
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
    // setTree(constructNodes(rows, columns, coordinates));
  };

  const handleStart = () => {
    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    const start = tree[sX][sY];
    const finish = tree[fX][fY];

    const visitedInOrder = djikstra(tree, start, finish);
    if (!visitedInOrder) return;

    resetAllNodes(tree);
    setIsSearching(true);
    visualize(visitedInOrder, 2, onFinish);
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
      {tree.map((row, y) => (
        <div className={"row"} id={`row-${y}`}>
          {row.map((node, x) => (
            <Node
              key={`${y}-${x}`}
              handleNodeClick={handleNodeClick}
              {...node}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
