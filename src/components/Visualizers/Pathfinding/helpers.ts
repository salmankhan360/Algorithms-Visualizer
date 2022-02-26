import { CoordinatesType, NodeType } from "../../../Types";

export function locateCoordinates(
  table: NodeType[][],
  coordinates: CoordinatesType
) {
  const {
    start: { x: sX, y: sY },
    finish: { x: fX, y: fY },
  } = coordinates;
  table[sX][sY].isStart = true;
  table[fX][fY].isFinish = true;
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

export function visualize(
  visitedInOrder: NodeType[],
  speed: number,
  finish: NodeType,
  start: NodeType,
  onFinish: () => void,
  onStart: (timeouts: any) => void
) {
  const allTimeouts: any = [];
  visitedInOrder.forEach((node, i) => {
    const { x, y } = node;
    const nodeTag: any = document.getElementById(`${x}-${y}`);
    if (speed == 0) {
      nodeTag.classList.add("searching");
    } else {
      const timeout = setTimeout(() => {
        nodeTag.classList.add("searching");
        nodeTag.classList.add("searchAnim");
      }, speed * i);
      allTimeouts.push(timeout);
    }
  });

  const timeout = setTimeout(
    () => visualizePath(finish, start, speed, onFinish, allTimeouts),
    speed * visitedInOrder.length
  );
  allTimeouts.push(timeout);
  onStart(allTimeouts);
}

function getAllPrevNodes(node: NodeType, prevNodes: NodeType[] = []) {
  const { previousNode } = node;
  if (previousNode) {
    prevNodes.unshift(previousNode);
    getAllPrevNodes(previousNode, prevNodes);
  }
  return prevNodes;
}
function visualizePath(
  finish: NodeType,
  start: NodeType,
  speed: number,
  onFinish: () => void,
  allTimeouts: any[]
) {
  const finishPath = getAllPrevNodes(finish);
  const startPath = getAllPrevNodes(start);

  let path: NodeType[] = [];
  if (finishPath.length < startPath.length) {
    if (startPath.length) path = startPath;
  } else {
    if (finishPath.length) path = finishPath;
  }

  path.forEach((node, i) => {
    const { x, y } = node;
    const pathNode = document.getElementById(`${x}-${y}`);
    if (speed == 0) {
      pathNode?.classList.add("path");
    } else {
      const timeout = setTimeout(() => {
        pathNode?.classList.add("path");
        pathNode?.classList.add("pathAnim");
      }, i * 1.2 * speed);
      allTimeouts.push(timeout);
    }
  });

  const timeout = setTimeout(() => onFinish(), (path.length - 1) * 1.2 * speed);
  allTimeouts.push(timeout);
  return;
}

export function resetAllNodes(tree: NodeType[][]) {
  tree.forEach((col) =>
    col.forEach((node) => {
      const { x, y } = node;
      const nodeTag = document.getElementById(`${x}-${y}`);

      nodeTag?.classList?.remove(`searching`, "path", "searchAnim", "pathAnim");
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
  pattern: { x: number; y: number; wallIndex?: number }[],
  speed: number,
  tree: NodeType[][],
  setTree: (tree: NodeType[][]) => void,
  onFinish: () => void,
  onStart: (timeouts: any) => void
) => {
  const allTimeouts: any = [];
  if (pattern[0].wallIndex !== undefined) sortByProp(pattern, "wallIndex");
  else sortByCoordinates(pattern);

  const chunk1 = pattern.slice(0, pattern.length / 2);
  const chunk2 = pattern.slice(pattern.length / 2);

  chunk1?.forEach((val, i) => {
    const { x, y } = val;
    const node = tree[x]?.[y];
    if (!node.isWall) {
      const timeout = setTimeout(() => {
        if (!node.isFinish && !node.isStart) {
          node.isWall = true;
          setTree([...tree]);
          i++;
        }
      }, i * speed);
      allTimeouts.push(timeout);
    }
  });
  chunk2?.forEach((val, i) => {
    const { x, y } = chunk2[chunk2.length - 1 - i];
    const node = tree[x]?.[y];
    if (!node.isWall) {
      const timeout = setTimeout(() => {
        if (!node.isFinish && !node.isStart) {
          node.isWall = true;
          setTree([...tree]);
          i++;
        }
      }, i * speed);
      allTimeouts.push(timeout);
    }
  });

  const timeout = setTimeout(() => onFinish(), chunk1.length * speed);
  allTimeouts.push(timeout);
  onStart(allTimeouts);
};

function sortByCoordinates(arr: { x: number; y: number }[], direction = "asc") {
  arr.sort((a, b) => {
    const sumA = a.x + a.y;
    const sumB = b.x + b.y;
    if (direction === "asc") {
      return sumA - sumB;
    }
    return sumB - sumA;
  });
}

function sortByProp(arr: any, prop: string, direction = "asc") {
  arr.sort((a: any, b: any) => {
    if (direction === "asc") {
      return a[prop] - b[prop];
    }
    return b[prop] - a[prop];
  });
}
// Below code is for Directions of the search

export function getBidirectionalNodes(
  coordinates: CoordinatesType,
  tree: NodeType[][],
  selectedAlgorithm: (
    tree: NodeType[][],
    start: NodeType,
    finish: NodeType,
    heuristics: string
  ) => NodeType[],
  heuristics: string = "manhattan"
) {
  const finalVisited: NodeType[] = [];
  const {
    start: { x: sX, y: sY },
    finish: { x: fX, y: fY },
  } = coordinates;
  const copyTree = tree.map((row) => row.map((node) => ({ ...node, tree: 1 })));
  const copyTree2 = tree.map((row) =>
    row.map((node) => ({ ...node, tree: 2 }))
  );
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
  let i = 0;
  let j = 0;
  let e = 0;
  const prev: any = {};
  while (i < visitedInOrder1.length || j < visitedInOrder2.length) {
    e++;
    const p1 = `${visitedInOrder1[i]?.x}-${visitedInOrder1[i]?.y}`;
    const p2 = `${visitedInOrder2[j]?.x}-${visitedInOrder2[j]?.y}`;
    if (prev[p2] || prev[p1]) break;
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
  return { visitedInOrder: finalVisited, start: start2, finish };
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
  } = coordinates;

  const copyTree = tree.map((row) => row.map((node) => ({ ...node, tree: 1 })));

  const start = copyTree[sX][sY];
  const finish = copyTree[fX][fY];

  const visitedInOrder: NodeType[] | undefined = selectedAlgorithm(
    copyTree,
    start,
    finish,
    heuristics
  );

  return { visitedInOrder, start, finish };
}
