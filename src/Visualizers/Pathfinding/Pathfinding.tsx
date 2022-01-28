import React, { useState } from "react";
import Node from "./Node";
import { constructNodes } from "./helpers";
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
    start: { x: 10, y: 10 },
    finish: { x: 15, y: 30 },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const handleStart = () => {
    // for (let i = 0; i < tree.length; i++) {
    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    const start = tree[sX][sY];
    const finish = tree[fX][fY];

    djikstra(tree, start, finish);
    // setTimeout(() => {
    //   const nodeTag: any = document.getElementById(`${i}-${j}`);
    //   nodeTag.classList.add("searching");
    // });
    // }
  };

  const handleNodeClick = (x: number, y: number) => {
    const node = tree[x][y];
    const changedNode = { ...node, isWall: !node.isWall };
    const changedTree = tree.slice();
    changedTree[x][y] = changedNode;
    setTree(changedTree);
  };

  return (
    <div className="pathfindingContainer">
      <button style={{ marginBottom: "30px" }} onClick={handleStart}>
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
