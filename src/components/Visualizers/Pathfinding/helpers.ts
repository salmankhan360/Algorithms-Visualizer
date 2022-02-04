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
      const emptyNode = {
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
    setTimeout(() => {
      const nodeTag: any = document.getElementById(`${x}-${y}`);
      nodeTag.classList.add("searching");
      nodeTag.classList.add("searchAnim");
    }, i * speed);
  });
  const finish = visitedInOrder[visitedInOrder.length - 1];
  if (!finish.isFinish) {
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
  setTimeout(() => {
    const pathNode = document.getElementById(`${x}-${y}`);
    pathNode?.classList.add("path");
  }, i * speed);
  visualizePath(previousNode, speed, onFinish, i + 1);
}

export function resetAllNodes(tree: NodeType[][], speed: number) {
  console.log(speed);
  tree.forEach((col) =>
    col.forEach((node) => {
      const { x, y } = node;
      const nodeTag = document.getElementById(`${x}-${y}`);
      nodeTag?.classList?.remove(
        `searching`,
        speed > 0 ? "searchAnim" : "claas"
      );
      nodeTag?.classList?.remove("path");
    })
  );
}
