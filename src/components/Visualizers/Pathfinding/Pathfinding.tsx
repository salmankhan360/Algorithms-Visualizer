import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  constructNodes,
  visualize,
  resetAllNodes,
  drawPattern,
} from "./helpers";
import { parse } from "query-string";
import { Box } from "@mui/system";
import { djikstra, aStar, DFS, BFS } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";
import NodeInfo from "./NodeInfo";
import SelectSettings from "../../../shared_components/SelectSettings";
import {
  zigZagPattern,
  infinityPattern,
} from "../../../Algorithms/Pathfinding/WallPatterns";
import Actions from "./Actions";
import { stringify } from "query-string";

const allAlgorithms = {
  aStar,
  djikstra,
  DFS,
  BFS,
};
const speeds = {
  fast: 3,
  slow: 30,
  medium: 20,
  "0": 0,
};
const allPatterns = {
  infinity: infinityPattern,
  zigzag: zigZagPattern,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra";
  speed?: "fast" | "slow" | "medium" | "0";
  pattern?: "zigzag" | "infinity";
}
interface Props {
  columns: number;
  rows: number;
}

export default function Pathfinding(props: Props) {
  const [isVisualized, setVisualized] = useState(false);
  const { columns, rows } = props;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const qs: QueryProps = parse(search);
  const {
    algorithm = "djikstra",
    speed: qsSpeed = "medium",
    pattern = "zigzag",
  } = qs;
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: 4, y: 2 },
    finish: { x: 8, y: 10 },
  });
  const [tree, setTree] = useState<NodeType[][]>(
    constructNodes(rows, columns, coordinates)
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleReset = () => {
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree);
    setVisualized(false);
    setIsSearching(false);
  };

  const onFinish = () => {
    setIsSearching(false);
  };

  const handleStart = (speed: QueryProps["speed"] = "0") => {
    if (!algorithm || isSearching) return;
    setVisualized(true);

    const {
      start: { x: sX, y: sY },
      finish: { x: fX, y: fY },
    } = coordinates;

    const copyTree = tree.map((row) => row.map((node) => ({ ...node })));
    const start = copyTree[sX][sY];
    const finish = copyTree[fX][fY];

    const selectedAlgorithm = allAlgorithms[algorithm];
    const visitedInOrder = selectedAlgorithm(copyTree, start, finish);
    console.log(visitedInOrder);
    if (!visitedInOrder) return;

    setIsSearching(true);
    resetAllNodes(tree);
    visualize(visitedInOrder, speeds[speed], onFinish);
  };

  const handlePattern = () => {
    if (isSearching) return;
    isVisualized && setVisualized(false);

    const newTree = constructNodes(rows, columns, coordinates);
    resetAllNodes(tree);
    setIsSearching(true);
    drawPattern(allPatterns[pattern], 80, newTree, setTree, onFinish);
  };

  useEffect(() => {
    if (!isVisualized) return;
    resetAllNodes(tree);
    handleStart("0");
  }, [tree]);

  useEffect(() => {
    const qs: any = parse(search);
    qs["visualizing"] = isSearching;
    navigate(`${pathname}?${stringify(qs)}`);
  }, [isSearching]);

  const isWalls = tree.find((row) => row.find((node) => node.isWall));
  return (
    <div className="pathfindingWrapper">
      <NodeInfo />
      <div onClick={() => handleStart(qsSpeed)} id="visualize" />
      <div className="pathfindingContainer">
        <Box marginBottom="20px" className="flexCenter">
          <SelectSettings
            disabled={isSearching}
            feilds={{
              speed: ["slow", "medium", "fast"],
              algorithm: ["djikstra", "aStar", "DFS", "BFS"],
              pattern: ["zigzag", "infinity"],
            }}
          />
          <Actions
            onDrawPattern={handlePattern}
            onReset={handleReset}
            isChanged={!isSearching && !!isWalls}
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
