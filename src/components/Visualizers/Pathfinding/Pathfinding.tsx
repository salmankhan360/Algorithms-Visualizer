import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  constructNodes,
  visualize,
  resetAllNodes,
  drawPattern,
  getBidirectionalNodes,
  getSingleDirectionalNodes,
} from "./helpers";
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
import {
  infinityPattern,
  mazePattern,
  evenOddPattern,
  recursiveDivision,
  recursiveVertical,
  recursiveHorizontal,
} from "../../../Algorithms/Pathfinding/WallPatterns";
import RecursiveDivision from "../../../Algorithms/Mazes/RecursiveDivision";
import ZigZag from "../../../Algorithms/Pathfinding/ZigZag";
import Actions from "./Actions";
import { stringify } from "query-string";
import { kruskalsMaze } from "../../../Algorithms/Mazes/KruskalMaze";

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
const allPatterns: any = {
  ZigZag,
  RecursiveDivision,
  "Kruskal Spanning": kruskalsMaze,
  "Kruskal Expanding": kruskalsMaze,
};
const spanningPatterns: { [key: string]: boolean } = {
  "Kruskal Spanning": true,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra" | "DFS" | "BFS" | "Greedy-Best FS";
  speed?: "fast" | "slow" | "medium" | "0";
  pattern?: "ZigZag" | "infinity";
  direction?: "single" | "double";
  heuristics?: "manhattan" | "euclidean" | "chebyshev" | "octile";
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
    pattern = "RecursiveDivision",
    direction: qsDirection = "double",
    heuristics = "chebyshev",
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
  };

  const onFinish = () => setIsSearching(false);
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
    }: any = direction(coordinates, tree, selectedAlgorithm, heuristics);
    if (!visitedInOrder) return;
    if (speed != "0") setIsSearching(true);
    setTimeout(() => resetAllNodes(tree), 0);
    if (isBomb) {
      const deelay =
        speeds[speed] * bombedInOrder.length + speeds[speed] * pathArr.length;
      let t1: any = setTimeout(
        () =>
          bombedPath.length > 1 &&
          visualize(visitedInOrder, speeds[speed], pathArr, onFinish, onStart),
        deelay
      );
      visualize(
        bombedInOrder,
        speeds[speed],
        bombedPath,
        () => {},
        (t2) => onStart([...t2, t1]),
        isBomb
      );
    } else {
      visualize(visitedInOrder, speeds[speed], pathArr, onFinish, onStart);
    }
  };

  const handlePattern = () => {
    if (isSearching) return;
    isVisualized && setVisualized(false);
    resetAllNodes(tree, true);
    setIsSearching(true);
    const newTree = constructNodes(rows, columns, coordinates);
    const walls = allPatterns[pattern](newTree);
    const isSpanning = spanningPatterns[pattern];
    drawPattern(
      walls,
      isSpanning,
      speeds[qsSpeed],
      newTree,
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
    speed: ["medium", "slow", "fast"],
    algorithm: ["aStar", "Greedy-Best FS", "djikstra", "DFS", "BFS"],
    direction: ["double", "single"],
    pattern: ["RecursiveDivision", "Kruskal Spanning", "Kruskal Expanding"],
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
