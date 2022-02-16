import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { constructNodes, visualize, resetAllNodes } from "./helpers";
import { parse } from "query-string";

import { Box } from "@mui/system";
import { djikstra, aStar } from "../../../Algorithms/Pathfinding";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";
import NodeInfo from "./NodeInfo";
import { Button } from "@mui/material";
import SelectSettings from "../../../shared_components/SelectSettings";
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

  const handleReset = () => {
    setTree(constructNodes(rows, columns, coordinates));
    resetAllNodes(tree);
    setVisualized(false);
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
    resetAllNodes(tree);
    visualize(visitedInOrder, speeds[speed], onFinish);
  };

  useEffect(() => {
    if (!isVisualized) return;
    resetAllNodes(tree);
    handleStart("0");
  }, [tree]);

  const isWalls = tree.find((row) => row.find((node) => node.isWall));
  return (
    <div className="pathfindingWrapper">
      <NodeInfo />
      <div onClick={() => handleStart(qsSpeed)} id="visualize" />
      <div className="pathfindingContainer">
        <Box marginBottom="20px">
          <SelectSettings
            isChanged={!!isWalls}
            onReset={handleReset}
            feilds={{
              speed: ["slow", "medium", "fast"],
              algorithm: ["djikstra", "aStar"],
            }}
          />
        </Box>
        <Tree
          tree={tree}
          setTree={setTree}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
      </div>
    </div>
  );
}
