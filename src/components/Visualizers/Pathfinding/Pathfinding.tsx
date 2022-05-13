import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  constructNodes,
  visualize,
  resetAllNodes,
  drawPattern,
  getBidirectionalNodes,
  getSingleDirectionalNodes,
  getRandomCoordinates
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
import {
  PrimzMaze,
  RecursiveDivision,
  kruskalsMaze,
  RecursiveBacktracking,
  sideWinder,
  huntAndKill,
} from "../../../Algorithms/Mazes";
import { NodeType, CoordinatesType } from "../../../Types";
import "./styles.scss";
import Tree from "./Tree";
import NodeInfo from "./NodeInfo";
import SelectSettings from "../../../shared_components/SelectSettings";

import Actions from "./Actions";

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

const allPatterns = {
  "Prim's Spanning": PrimzMaze,
  "Recursive Division": RecursiveDivision,
  "Kruskal Spanning": kruskalsMaze,
  "Kruskal Set-Spanning": (tree: NodeType[][]) =>
    kruskalsMaze(tree, "set-spanning"),
  BackTracking: RecursiveBacktracking,
  "side-winder": sideWinder,
  "Hunt and Kill": huntAndKill,
};
const spanningPatterns: { [key: string]: boolean } = {
  "Kruskal Spanning": true,
  "Kruskal Set-Spanning": true,
  "Prim's Spanning": true,
  BackTracking: true,
  "side-winder": true,
  "Hunt and Kill": true,
};
interface QueryProps {
  algorithm?: "aStar" | "djikstra" | "DFS" | "BFS" | "Greedy-Best FS";
  speed?: number;
  maze?:
  | "Prim's Spanning"
  | "Recursive Division"
  | "Kruskal Spanning"
  | "Kruskal Set-Spanning"
  | "BackTracking"
  | "Hunt and Kill"
  | "side-winder";
  direction?: "single" | "double";
  heuristics?: "manhattan" | "euclidean" | "chebyshev" | "octile";
  diagonal?: any;
  audioNote?: "sine" | "square" | "sawtooth" | "triangle" | "off";
  size?: number;
}

export default function Pathfinding() {
  const [isVisualized, setVisualized] = useState(false);

  const { search } = useLocation();
  const qs: QueryProps = parse(search);
  const {
    algorithm = "aStar",
    speed: qsSpeedRaw = 20,
    maze = "BackTracking",
    direction: qsDirection = "single",
    heuristics = "chebyshev",
    diagonal = "no Diagnol",
    audioNote = "off",
    size = 30,
  } = qs;
  const qsSpeed = Math.abs(qsSpeedRaw);
  const [coordinates, setCoordinates] = useState<CoordinatesType>({
    start: { x: 0, y: 0 },
    finish: { x: 1, y: 1 },
  });
  const [tree, setTree] = useState<NodeType[][]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [clearTimeouts, setClearTimeouts] = useState<any>([]);

  const boxSize = size > 16 ? size : 16;
  useEffect(() => buildTree(), [boxSize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    const resizeBtn = document.getElementById("resize-btn");
    resizeBtn?.click();
  }
  function buildTree() {
    if (isSearching) return;
    const { columns, rows } = calculateDimensions(boxSize);
    const newCoordinates = {
      start: { x: Math.floor(rows / 2) - 5, y: 5 },
      finish: { x: Math.floor(rows / 2) + 5, y: Math.floor(columns) - 5 },
      // bomb: { x: Math.floor(rows / 2), y: Math.floor(columns / 2) },
    };
    resetAllNodes(tree, true);
    setCoordinates(newCoordinates);
    setTree(constructNodes(rows, columns, newCoordinates));
  }

  const calculateDimensions = (size: number) => {
    const maxWidth = window.innerWidth - 70;
    const maxHeight = window.innerHeight - 250;

    let columns = Math.floor(maxWidth / size);
    let rows = Math.floor(maxHeight / size);

    columns = columns % 2 == 0 ? columns + 1 : columns;
    rows = rows % 2 == 0 ? rows + 1 : rows;

    return { columns, rows };
  };

  const toggleBomb = () => {
    const { bomb, ...rest } = coordinates;
    if (bomb) {
      tree[bomb.x][bomb.y].isBomb = false;
      setTree(tree);
      setCoordinates(rest);
    } else {
      const { x, y } = getRandomCoordinates(tree)
      const bomb = {
        x,
        y
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

    setTree(constructNodes(tree.length, tree[0].length, coordinates));
    resetAllNodes(tree, true);
    setVisualized(false);
    setIsSearching(false);
    stopNote();
  };

  const onFinish = () => {
    document.querySelector(".head")?.classList.remove("head");
    stopNote();
    setIsSearching(false);
  };
  const onStart = (timeouts: any) => setClearTimeouts(timeouts);

  const handleStart = (speed = 0) => {
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
    if (speed != 0) setIsSearching(true);
    resetAllNodes(tree);
    const currSpeed = speed;
    if (isBomb) {
      const deelay =
        currSpeed * bombedInOrder.length + currSpeed * pathArr.length;
      let t1: any = setTimeout(
        () =>
          bombedPath.length > 1 &&
          visualize(
            visitedInOrder,
            currSpeed,
            pathArr,
            tree.length,
            tree[0].length,
            audioNote,
            onFinish,
            onStart
          ),
        deelay
      );
      visualize(
        bombedInOrder,
        currSpeed,
        bombedPath,
        tree.length,
        tree[0].length,
        audioNote,
        () => {
          stopNote();
          document.querySelector(".head")?.classList.remove("head");
        },
        (t2) => onStart([...t2, t1]),
        isBomb
      );
    } else {
      visualize(
        visitedInOrder,
        currSpeed,
        pathArr,
        tree.length,
        tree[0].length,
        audioNote,

        onFinish,
        onStart
      );
    }
  };

  const handlePattern = () => {
    if (isSearching) return;
    isVisualized && setVisualized(false);
    resetAllNodes(tree, true);
    setIsSearching(true);
    const newTree = constructNodes(tree.length, tree[0].length, coordinates);
    const walls = allPatterns[maze](newTree);

    const isSpanning = spanningPatterns[maze];
    drawPattern(
      walls,
      isSpanning,
      qsSpeed,
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
    handleStart(0);
  }, [tree, heuristics, coordinates]);

  const isWalls = tree.find((row) => row.find((node) => node.isWall));

  const queryFeilds: any = {
    audioNote: ["off", "sine", "square", "sawtooth", "triangle"],
    algorithm: ["aStar", "Greedy-Best FS", "djikstra", "BFS", "DFS"],
    maze: [
      "BackTracking",
      "Prim's Spanning",
      "Recursive Division",
      "Kruskal Spanning",
      "Kruskal Set-Spanning",
      "side-winder",
    ],
    direction: ["single", "double"],
    diagonal: [ "No Diagnol", "Diagnol"],
  };
  if (algorithm === "aStar" || algorithm == "Greedy-Best FS")
    queryFeilds.heuristics = ["chebyshev", "euclidean", "octile", "manhattan"];
  return (
    <div className="pathfindingWrapper">
      <button
        style={{ display: "none" }}
        onClick={() => buildTree()}
        id={"resize-btn"}
      ></button>
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
