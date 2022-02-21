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
  onFinish: () => void
) {
  visitedInOrder.forEach((node, i) => {
    const { x, y } = node;
    const nodeTag: any = document.getElementById(`${x}-${y}`);
    if (speed == 0) {
      nodeTag.classList.add("searching");
    } else {
      setTimeout(() => {
        nodeTag.classList.add("searching");
        nodeTag.classList.add("searchAnim");
      }, speed * i);
    }
  });
  const finish = visitedInOrder[visitedInOrder.length - 1];
  if (!finish?.isFinish) {
    onFinish();
    return;
  }
  setTimeout(
    () => visualizePath(finish, speed, onFinish),
    speed * visitedInOrder.length
  );
}

function visualizePath(
  closestNode: NodeType,
  speed: number,
  onFinish: () => void,
  i = 0
) {
  if (!closestNode.previousNode) {
    setTimeout(() => onFinish(), speed * i);
    return;
  }
  const { previousNode } = closestNode;
  const { x, y } = previousNode;
  const pathNode = document.getElementById(`${x}-${y}`);
  if (speed == 0) {
    pathNode?.classList.add("path");
  } else {
    setTimeout(() => {
      pathNode?.classList.add("path");
      pathNode?.classList.add("pathAnim");
    }, i * speed);
  }
  visualizePath(previousNode, speed, onFinish, i + 1);
  let prev = previousNode?.previousNode;
  prev = undefined;
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
  pattern: { x: number; y: number }[],
  speed: number,
  tree: NodeType[][],
  setTree: (tree: NodeType[][]) => void,
  onFinish: () => void
) => {
  sortByCoordinates(pattern);

  const chunk1 = pattern.slice(0, pattern.length / 2);
  const chunk2 = pattern.slice(pattern.length / 2);
  sortByCoordinates(chunk2);

  chunk1?.forEach((val, i) => {
    const { x, y } = val;
    const node = tree[x][y];
    if (!node.isWall) {
      setTimeout(() => {
        if (!node.isFinish && !node.isStart) {
          node.isWall = true;
          setTree([...tree]);
          i++;
        }
      }, i * speed);
    }
  });

  chunk2?.forEach((val, i) => {
    const { x, y } = chunk2[chunk2.length - 1 - i];
    const node = tree[x][y];
    if (!node.isWall) {
      setTimeout(() => {
        if (!node.isFinish && !node.isStart) {
          node.isWall = true;
          setTree([...tree]);
          i++;
        }
      }, i * speed);
    }
  });
  setTimeout(() => onFinish(), chunk1.length * speed);
};

const sortByCoordinates = (
  arr: { x: number; y: number }[],
  direction = "asc"
) => {
  arr.sort((a, b) => {
    const sumA = a.x + a.y;
    const sumB = b.x + b.y;
    if (direction === "asc") {
      return sumA - sumB;
    }
    return sumB - sumA;
  });
};
