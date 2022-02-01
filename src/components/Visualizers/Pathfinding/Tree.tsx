import React, { useState } from "react";
import Node from "./Node";
import { CoordinatesType, NodeType } from "../../../Types";

interface Props {
  tree: NodeType[][];
  setTree: (tree: NodeType[][]) => void;
  coordinates: CoordinatesType;
  setCoordinates: (c: CoordinatesType) => void;
}

interface CoordinatesClickType {
  start?: boolean;
  finish?: boolean;
}
export default function Tree(props: Props) {
  const { tree, setTree, coordinates, setCoordinates } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [coordinatesClick, setCoordinatesClick] =
    useState<CoordinatesClickType | null>();

  // This component is a little bit dirty because of the advance event listners
  // I'm not sure if it's the best way to do it, but it works for now

  const handleCoordinates = (node: NodeType) => {
    const { x, y } = node;
    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;
    const treeCopy = tree.slice();

    if (coordinatesClick?.start) {
      treeCopy[sX][sY].isStart = false;
      treeCopy[x][y].isStart = true;
      setCoordinates({ ...coordinates, start: { x, y } });
    } else {
      treeCopy[fX][fY].isFinish = false;
      treeCopy[x][y].isFinish = true;
      setCoordinates({ ...coordinates, finish: { x, y } });
    }
    setTree(treeCopy);
  };

  const handleNodeClick = (x: number, y: number, eventType = "onClick") => {
    const node = tree[x][y];

    if (!node.isWall) {
      if (node.isStart || node.isFinish) {
        if (eventType === "onMouseDown")
          setCoordinatesClick({ [node.isStart ? "start" : "finish"]: true });
        else if (eventType === "onMouseUp") setCoordinatesClick(null);
        return;
      } else if (eventType === "onMouseOver" && coordinatesClick) {
        handleCoordinates(node);
        return;
      }
    }

    if ((eventType == "onMouseOver" && !isClicked) || eventType == "onMouseUp")
      return;
    const changedNode = { ...node, isWall: !node.isWall };
    const changedTree = tree.slice();
    changedTree[x][y] = changedNode;
    setTree(changedTree);
  };

  return (
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
              {...node}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
