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
  zigZagPattern,
  infinityPattern,
  mazePattern,
  evenOddPattern,
  recursiveDivision,
  recursiveVertical,
  recursiveHorizontal,
} from "../../../Algorithms/Pathfinding/WallPatterns";
import Actions from "./Actions";
import { stringify } from "query-string";

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
  infinity: infinityPattern,
  zigzag: zigZagPattern,
  maze: mazePattern,
  evenOdd: evenOddPattern,
  Recursive: recursiveDivision,
  "Recursive-Y": recursiveVertical,
  "Recursive-X": recursiveHorizontal,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra" | "DFS" | "BFS" | "Greedy-Best FS";
  speed?: "fast" | "slow" | "medium" | "0";
  pattern?: "zigzag" | "infinity";
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
    pattern = "zigzag",
    direction: qsDirection = "double",
    heuristics = "chebyshev",
  } = qs;
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: 7, y: 9 },
    finish: { x: 7, y: 28 },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const [isSearching, setIsSearching] = useState(false);
  const [clearTimeouts, setClearTimeouts] = useState<any>([]);

  const handleReset = () => {
    clearTimeouts.forEach((timeout: any) => {
      clearTimeout(timeout);
    });
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree);
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

    const { visitedInOrder, pathArr }: any = direction(
      coordinates,
      tree,
      selectedAlgorithm,
      heuristics
    );
    if (!visitedInOrder) return;
    if (speed != "0") setIsSearching(true);
    resetAllNodes(tree);
    visualize(visitedInOrder, speeds[speed], pathArr, onFinish, onStart);
  };

  const handlePattern = () => {
    if (isSearching) return;
    isVisualized && setVisualized(false);
    resetAllNodes(tree);
    setIsSearching(true);
    const newTree = constructNodes(rows, columns, coordinates);
    drawPattern(allPatterns[pattern], 80, newTree, setTree, onFinish, onStart);
  };

  useEffect(() => {
    if (!isVisualized) return;
    resetAllNodes(tree);
    handleStart("0");
  }, [tree, heuristics]);

  const isWalls = tree.find((row) => row.find((node) => node.isWall));

  const queryFeilds: any = {
    speed: ["medium", "slow", "fast"],
    algorithm: ["Greedy-Best FS", "aStar", "djikstra", "DFS", "BFS"],
    direction: ["double", "single"],
    pattern: [
      "zigzag",
      "Recursive",
      "infinity",
      "maze",
      "Recursive-Y",
      "Recursive-X",
      "evenOdd",
    ],
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
