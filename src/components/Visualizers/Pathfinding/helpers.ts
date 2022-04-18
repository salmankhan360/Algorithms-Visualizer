import { CoordinatesType, NodeType } from "../../../Types";
import { changePrevNodes, sortByProp } from "../../../Utils/Pathfinding";
import { addUniqueClass as addUltraUniqueClass } from "../Sorting/helpers";
export function locateCoordinates(
  table: NodeType[][],
  coordinates: CoordinatesType
) {
  const {
    start: { x: sX, y: sY },
    finish: { x: fX, y: fY },
    bomb,
  } = coordinates;
  const inRange =
    table.length - 1 >= sX &&
    table[0].length - 1 >= sY &&
    table.length - 1 >= fX &&
    table[0].length - 1 >= fY;
  if (inRange) {
    table[sX][sY].isStart = true;
    table[fX][fY].isFinish = true;
    if (bomb) table[bomb.x][bomb.y].isBomb = true;
  } else {
    table[table.length - 2][table[0].length - 2].isFinish = true;
    table[1][1].isStart = true;
    if (bomb) table[0][table[0].length - 1].isBomb = true;
  }
}
export function constructNodes(
  rows: number,
  columns: number,
  coordinates: CoordinatesType
) {
  const table = [];
  for (let i = 0; i < rows; i++) {
    const columnsArr = [];
    for (let j = 0; j < columns; j++) {
      const emptyNode: any = {
        id: table.length,
        x: i,
        y: j,
        wallIndex: 0,
        distance: Infinity,
        heuristics: Infinity,
        isVisited: false,
        isWall: false,
        isPath: false,
        isStart: false,
        isFinish: false,
        searching: false,
      };
      columnsArr.push(emptyNode);
    }
    table.push(columnsArr);
  }

  locateCoordinates(table, coordinates);
  return table;
}

const addUniqueClass = (classname: string, id: string) => {
  const node = document.getElementById(id);
  if (node) {
    node.classList.remove(classname);
    setTimeout(() => node.classList.add(classname), 0);
  }
};
export function visualize(
  visitedInOrder: NodeType[],
  speed: number,
  pathArr: NodeType[],
  onFinish: () => void,
  onStart: (timeouts: any) => void,
  isBomb: boolean = false
) {
  const allTimeouts: any = [];
  visitedInOrder.forEach((node, i) => {
    const { x, y } = node;
    const nodeTag: any = document.getElementById(`${x}-${y}`);
    if (speed == 0) {
      if (isBomb) nodeTag.classList.add("bombed");
      else nodeTag.classList.add("searching");
    } else {
      const timeout = setTimeout(() => {
        if (isBomb) {
          nodeTag.classList.add("bombed");
          nodeTag.classList.add("bombedAnim");
        } else {
          nodeTag.classList.add("searching");
          nodeTag.classList.add("searchAnim");
        }
      }, speed * i);
      allTimeouts.push(timeout);
    }
  });

  const timeout = setTimeout(
    () => visualizePath(pathArr, speed, onFinish, allTimeouts),
    speed * visitedInOrder.length
  );
  allTimeouts.push(timeout);
  onStart(allTimeouts);
  return allTimeouts;
}

function getAllPrevNodes(node: NodeType, prevNodes: NodeType[] = []) {
  const { previousNode } = node;
  if (previousNode) {
    console.log(prevNodes);
    prevNodes.unshift(previousNode);
    getAllPrevNodes(previousNode, prevNodes);
  }
  return prevNodes;
}
function visualizePath(
  pathArr: NodeType[],
  speed: number,
  onFinish: () => void,
  allTimeouts: any[]
) {
  pathArr.forEach((node, i) => {
    const { x, y } = node;
    const id = `${x}-${y}`;
    const nodeTag: any = document.getElementById(id);
    if (speed != 0) {
      const timeout = setTimeout(() => {
        addUniqueClass("pathAnim", id);
        addUniqueClass("path", id);
        // addUltraUniqueClass('path-head');
      }, i * 1.2 * speed);
      allTimeouts.push(timeout);
    } else {
      nodeTag.classList.add("path");
    }
  });

  const timeout = setTimeout(
    () => onFinish(),
    (pathArr.length - 1) * 1.2 * speed
  );
  allTimeouts.push(timeout);
  return;
}

export function resetAllNodes(tree: NodeType[][], isWalls: boolean = false) {
  tree.forEach((col) =>
    col.forEach((node) => {
      const { x, y } = node;
      const nodeTag = document.getElementById(`${x}-${y}`);

      nodeTag?.classList?.remove(
        `searching`,
        "bombed",
        "bombedAnim",
        "path",
        "searchAnim",
        "pathAnim",
        isWalls ? "wall-node" : "shutah"
      );
    })
  );
}

export function getRandomIndices(
  max: number,
  i = 0,
  arr: number[] = [],
  indexHash: any = {}
) {
  if (i === max) return;
  const index = Math.floor(Math.random() * max);
  if (indexHash[index]) {
    getRandomIndices(max, i, arr, indexHash);
  } else {
    indexHash[index] = true;
    arr.push(index);
    getRandomIndices(max, i + 1, arr, indexHash);
  }
  return arr;
}

export const drawPattern = (
  pattern: { x: number; y: number }[],
  isSpanning: boolean,
  speed: number,
  tree: NodeType[][],
  setTree: (tree: NodeType[][]) => void,
  onFinish: () => void,
  onStart: (timeouts: any) => void
) => {
  const allTimeouts: any = [];
  const treeCopy = tree.map((row) => row.map((node) => ({ ...node })));

  if (isSpanning) {
    treeCopy.flat().forEach((node) => {
      const { x, y } = node;
      const nodeTag: any = document.getElementById(`${x}-${y}`);
      if (!node.isStart && !node.isFinish && !node.isBomb) {
        nodeTag.classList.add("wall-spanning");
        treeCopy[x][y].isWall = true;
      }
    });
    pattern.forEach((node, i) => {
      const { x, y } = node;
      const nodeTag: any = document.getElementById(`${x}-${y}`);
      let time = setTimeout(() => {
        const node = treeCopy[x][y];
        if (!node.isStart && !node.isFinish && !node.isBomb) {
          nodeTag.classList.remove("wall-spanning");
          treeCopy[x][y].isWall = false;
        }
      }, speed * i);
      allTimeouts.push(time);
    });
  } else {
    pattern.forEach((node, i) => {
      const { x, y } = node;
      const nodeTag: any = document.getElementById(`${x}-${y}`);
      let time = setTimeout(() => {
        const node = treeCopy[x][y];
        if (!node.isStart && !node.isFinish && !node.isBomb) {
          nodeTag.classList.add("wall-node");
          treeCopy[x][y].isWall = true;
        }
      }, speed * i);
      allTimeouts.push(time);
    });
  }

  let time = setTimeout(() => {
    onFinish();
    setTree(treeCopy);
  }, speed * pattern.length);
  allTimeouts.push(time);
  onStart(allTimeouts);
};

// Below code is for Directions of the search
const bothDirections = (
  coordinates: CoordinatesType,
  tree: NodeType[][],
  selectedAlgorithm: (
    tree: NodeType[][],
    start: NodeType,
    finish: NodeType,
    heuristics: string
  ) => NodeType[],
  heuristics: string = "manhattan"
) => {
  const finalVisited: NodeType[] = [];
  const {
    start: { x: sX, y: sY },
    finish: { x: fX, y: fY },
  } = coordinates;
  const copyTree = tree.map((row) => row.map((node) => ({ ...node })));
  const copyTree2 = tree.map((row) => row.map((node) => ({ ...node })));
  const start = copyTree[sX][sY];
  const finish = copyTree[fX][fY];
  const start2 = copyTree2[sX][sY];
  const finish2 = copyTree2[fX][fY];
  const visitedInOrder1: NodeType[] = selectedAlgorithm(
    copyTree,
    start,
    finish,
    heuristics
  );
  const visitedInOrder2: NodeType[] = selectedAlgorithm(
    copyTree2,
    finish2,
    start2,
    heuristics
  );
  const visited1Hash: any = {};
  const visited2Hash: any = {};
  visitedInOrder1.forEach((n) => {
    visited1Hash[`${n.x}-${n.y}`] = n;
  });
  visitedInOrder2.forEach((n) => {
    visited2Hash[`${n.x}-${n.y}`] = n;
  });

  let pathArr: any = [];

  let i = 0;
  let j = 0;
  let e = 0;
  const prev: any = {};
  while (i < visitedInOrder1.length || j < visitedInOrder2.length) {
    e++;
    const p1 = `${visitedInOrder1[i]?.x}-${visitedInOrder1[i]?.y}`;
    const p2 = `${visitedInOrder2[j]?.x}-${visitedInOrder2[j]?.y}`;
    if (prev[p2] || prev[p1]) {
      if (prev[p2]) {
        pathArr = getSwitchedPath(prev[p2], visited2Hash[p2]);
      } else {
        pathArr = getSwitchedPath(prev[p1], visited1Hash[p1]);
      }
      break;
    }
    if (e % 2 == 0 && visitedInOrder1[i]) {
      prev[p1] = visitedInOrder1[i];
      finalVisited.push(visitedInOrder1[i]);
      i++;
    } else if (visitedInOrder2[j]) {
      prev[p2] = visitedInOrder2[j];
      finalVisited.push(visitedInOrder2[j]);
      j++;
    }
  }

  return {
    visitedInOrder: finalVisited,
    pathArr,
  };
};
const clone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
export function getBidirectionalNodes(
  coordinates: any,
  tree: NodeType[][],
  selectedAlgorithm: (
    tree: NodeType[][],
    start: NodeType,
    finish: NodeType,
    heuristics: string
  ) => NodeType[],
  heuristics: string = "manhattan"
) {
  coordinates = clone(coordinates);
  if (coordinates.bomb) {
    const coordinatesCopy = clone(coordinates);
    coordinates.finish = clone(coordinatesCopy.bomb);
    const { visitedInOrder: bombedInOrder, pathArr: bombedPath } =
      bothDirections(coordinates, tree, selectedAlgorithm, heuristics);
    coordinates.start = clone(coordinatesCopy.bomb);
    coordinates.finish = clone(coordinatesCopy.finish);
    const { visitedInOrder, pathArr } = bothDirections(
      coordinates,
      tree,
      selectedAlgorithm,
      heuristics
    );
    return { visitedInOrder, pathArr, bombedPath, bombedInOrder };
  } else {
    const { visitedInOrder, pathArr } = bothDirections(
      coordinates,
      tree,
      selectedAlgorithm,
      heuristics
    );
    return {
      visitedInOrder,
      pathArr,
    };
  }
}

function getSwitchedPath(node1: NodeType, node2: NodeType) {
  changePrevNodes(node1, node2);
  const firstNodes = getAllPrevNodes(node1);
  const secondNodes = getAllPrevNodes(node2);
  const path = [...firstNodes, ...secondNodes];
  path.sort((a, b) => a.distance - b.distance);
  return path;
}

export function getSingleDirectionalNodes(
  coordinates: CoordinatesType,
  tree: NodeType[][],
  selectedAlgorithm: (
    tree: NodeType[][],
    start: NodeType,
    finish: NodeType,
    heuristics: string
  ) => NodeType[] | undefined,
  heuristics: string
) {
  const {
    start: { x: sX, y: sY },
    finish: { x: fX, y: fY },
    bomb,
  } = coordinates;

  const copyTree = tree.map((row) => row.map((node) => ({ ...node })));

  let start = copyTree[sX][sY];
  const finish = copyTree[fX][fY];

  let bombedInOrder: NodeType[] | undefined = [];

  let bombedFinish: NodeType | undefined;
  if (bomb) {
    const { x: bX, y: bY } = bomb;
    const copyTree2 = tree.map((row) => row.map((node) => ({ ...node })));
    const start2 = copyTree2[sX][sY];
    const finish2 = copyTree2[bX][bY];
    start = copyTree[bX][bY];
    bombedFinish = finish2;
    bombedInOrder = selectedAlgorithm(copyTree2, start2, finish2, heuristics);
  }
  const visitedInOrder: NodeType[] | undefined = selectedAlgorithm(
    copyTree,
    start,
    finish,
    heuristics
  );
  let pathArr = getAllPrevNodes(finish);
  let bombedPath = bombedFinish ? getAllPrevNodes(bombedFinish) : [];

  return { visitedInOrder, pathArr, bombedInOrder, bombedPath };
}
