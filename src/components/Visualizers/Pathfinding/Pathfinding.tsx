import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  constructNodes,
  visualize,
  resetAllNodes,
  drawPattern,
  getBidirectionalNodes,
  getSingleDirectionalNodes,
} from "./helpers";
import { stopNote } from "../../../Utils/Pathfinding";
import { parse } from "query-string";
import { Box } from "@mui/system";
import {
  djikstra,
  aStar,
  DFS,
  BFS,
  BestFS,
} from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";
import NodeInfo from "./NodeInfo";
import SelectSettings from "../../../shared_components/SelectSettings";

import RecursiveDivision from "../../../Algorithms/Mazes/RecursiveDivision";
import Actions from "./Actions";
import { kruskalsMaze } from "../../../Algorithms/Mazes/KruskalMaze";
import PrimzMaze from "../../../Algorithms/Mazes/PrimzMaze";

const allAlgorithms = {
  aStar,
  djikstra,
  DFS,
  BFS,
  "Greedy-Best FS": BestFS,
};
const directions = {
  single: getSingleDirectionalNodes,
  double: getBidirectionalNodes,
};
const speeds = {
  fast: 10,
  slow: 40,
  medium: 20,
  "0": 0,
};
const allPatterns = {
  "Prim's Spanning": PrimzMaze,
  "Recursive Division": RecursiveDivision,
  "Kruskal Spanning": kruskalsMaze,
  "Kruskal Set-Spanning": (tree: NodeType[][]) =>
    kruskalsMaze(tree, "set-spanning"),
};
const spanningPatterns: { [key: string]: boolean } = {
  "Kruskal Spanning": true,
  "Kruskal Set-Spanning": true,
  "Prim's Spanning": true,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra" | "DFS" | "BFS" | "Greedy-Best FS";
  speed?: "fast" | "slow" | "medium" | "0";
  maze?:
    | "Prim's Spanning"
    | "Recursive Division"
    | "Kruskal Spanning"
    | "Kruskal Set-Spanning";
  direction?: "single" | "double";
  heuristics?: "manhattan" | "euclidean" | "chebyshev" | "octile";
  diagonal?: "Diagonal" | "No Diagonal";
  audioNote?: "sine" | "square" | "sawtooth" | "triangle";
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
  const {
    algorithm = "aStar",
    speed: qsSpeed = "medium",
    maze = "Prim's Spanning",
    direction: qsDirection = "double",
    heuristics = "chebyshev",
    diagonal = "Diagnol",
    audioNote = "sine",
  } = qs;
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: Math.floor(rows / 2) - 5, y: 5 },
    finish: { x: Math.floor(rows / 2) + 5, y: Math.floor(columns) - 5 },
    bomb: { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const [isSearching, setIsSearching] = useState(false);
  const [clearTimeouts, setClearTimeouts] = useState<any>([]);

  const toggleBomb = () => {
    const { bomb, ...rest } = coordinates;
    if (bomb) {
      tree[bomb.x][bomb.y].isBomb = false;
      setTree(tree);
      setCoordinates(rest);
    } else {
      const bomb = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * columns),
      };
      tree[bomb.x][bomb.y].isBomb = true;
      setTree(tree);
      setCoordinates({
        ...coordinates,
        bomb,
      });
    }
  };
  const handleReset = () => {
    clearTimeouts.forEach((timeout: any) => {
      clearTimeout(timeout);
    });
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree, true);
    setVisualized(false);
    setIsSearching(false);
    stopNote();
  };

  const onFinish = () => {
    document.querySelector(".head")?.classList.remove("head");
    setIsSearching(false);
  };
  const onStart = (timeouts: any) => setClearTimeouts(timeouts);

  const handleStart = (speed: QueryProps["speed"] = "0") => {
    if (!algorithm || isSearching) return;
    setVisualized(true);

    const selectedAlgorithm: any = allAlgorithms[algorithm];
    const direction = directions[qsDirection];
    const isBomb = !!coordinates.bomb;

    const {
      visitedInOrder,
      pathArr,
      bombedPath = [],
      bombedInOrder = [],
    }: any = direction(
      coordinates,
      tree,
      selectedAlgorithm,
      heuristics,
      diagonal == "Diagnol"
    );
    if (!visitedInOrder) return;
    if (speed != "0") setIsSearching(true);
    setTimeout(() => resetAllNodes(tree), 0);
    const currSpeed =
      qsDirection == "single" ? speeds[speed] : speeds[speed] / 2;
    if (isBomb) {
      const deelay =
        currSpeed * bombedInOrder.length + currSpeed * pathArr.length;
      let t1: any = setTimeout(
        () =>
          bombedPath.length > 1 &&
          visualize(visitedInOrder, currSpeed, pathArr, onFinish, onStart),
        deelay
      );
      visualize(
        bombedInOrder,
        currSpeed,
        bombedPath,

        () => {},
        (t2) => onStart([...t2, t1]),
        isBomb
      );
    } else {
      visualize(visitedInOrder, currSpeed, pathArr, onFinish, onStart);
    }
  };

  const handlePattern = () => {
    if (isSearching) return;
    isVisualized && setVisualized(false);
    resetAllNodes(tree, true);
    setIsSearching(true);
    const newTree = constructNodes(rows, columns, coordinates);
    const walls = allPatterns[maze](newTree);

    const isSpanning = spanningPatterns[maze];
    drawPattern(
      walls,
      isSpanning,
      speeds[qsSpeed],
      newTree,
      audioNote,
      setTree,
      onFinish,
      onStart
    );
  };

  useEffect(() => {
    if (!isVisualized) return;
    resetAllNodes(tree);
    handleStart("0");
  }, [tree, heuristics, coordinates]);

  const isWalls = tree.find((row) => row.find((node) => node.isWall));

  const queryFeilds: any = {
    audioNote: ["sine", "square", "sawtooth", "triangle"],
    speed: ["medium", "slow", "fast"],
    algorithm: ["aStar", "Greedy-Best FS", "djikstra", "DFS", "BFS"],
    maze: [
      "Prim's Spanning",
      "Kruskal Spanning",
      "Recursive Division",
      "Kruskal Set-Spanning",
    ],
    direction: ["double", "single"],
    diagonal: ["Diagnol", "No Diagnol"],
  };
  if (algorithm === "aStar" || algorithm == "Greedy-Best FS")
    queryFeilds.heuristics = ["chebyshev", "euclidean", "octile", "manhattan"];
  return (
    <div className="pathfindingWrapper">
      <NodeInfo />
      <div onClick={() => handleStart(qsSpeed)} id="visualize" />
      <div className="pathfindingContainer">
        <Box className="settingsWapper">
          <SelectSettings disabled={isSearching} feilds={queryFeilds} />
          <Actions
            onStart={() => handleStart(qsSpeed)}
            onDrawPattern={handlePattern}
            onReset={handleReset}
            onToggleBomb={toggleBomb}
            isBomb={!!coordinates.bomb}
            isSearching={isSearching}
            isChanged={isSearching || !!isWalls || isVisualized}
          />
        </Box>
        <Tree
          tree={tree}
          setTree={setTree}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
}
