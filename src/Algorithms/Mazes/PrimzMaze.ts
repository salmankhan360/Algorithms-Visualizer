import { NodeType, WallsInOrder } from "../../Types";
import { getNeighbours } from "../../Utils/Pathfinding";

interface EdgeCells {
  nodeA: NodeType;
  nodeB: NodeType;
  isConnected?: boolean;
}

export default function PrimzMaze(tree: NodeType[][]) {
  // const tree = JSON.parse(JSON.stringify(tree2));  // Not copying because its expensive
  const wallsInOrder: WallsInOrder = [];
  const rows = tree.length;
  const columns = tree[0].length;

  let oi = 0;
  let oj = 0;
  let i = 0;
  let j = 0;
  let cellHash: any = {};
  for (i = 0, oi = 1; i < rows - 1; i++, oi += 2) {
    for (j = 0, oj = 1; j < columns - 1; j++, oj += 2) {
      let hashId = `${i}-${j}`;
      let hashid2 = `${oi}-${oj}`;
      cellHash[hashid2] = true;

      let isBorder = i == 0 || j == 0 || i == rows || j == columns;

      if (!isBorder) {
        if (cellHash[hashId]) tree[i][j].isCell = true;
        else {
          tree[i][j].weight = Math.random();
          tree[i][j].isEdge = true;
        }
      }
    }
  }

  const startCell = getRandomCell(tree);
  const que = [startCell];

  while (true) {
    const { nodeA, nodeB, edge }: any = getLowestWeightEdge(que, tree);

    if (!edge) break;

    nodeA.isChecked = true; // Not using isVisited to avoid Mutations with Pathfinding Algorithms
    nodeB.isChecked = true;
    que.push(nodeA, nodeB);
    wallsInOrder.push(nodeA, edge, nodeB);
  }

  return wallsInOrder;
}

function getLowestWeightEdge(que: NodeType[], tree: NodeType[][]) {
  let edgeCells: any;
  let edge;
  let weight = Infinity;
  que.forEach((cell) => {
    getNeighbours(tree, cell).forEach((n: any) => {
      if (n.isEdge) {
        const cells = getCellsOfEdge(n, tree);
        if (n.isEdge && weight > n.weight && !cells.isConnected) {
          edge = n;
          weight = edge.weight;
          edgeCells = cells;
        }
      }
    });
  });

  if (edgeCells)
    return { edge, nodeA: edgeCells.nodeA, nodeB: edgeCells.nodeB };

  return false;
}

function getCellsOfEdge(edge: NodeType, tree: NodeType[][]): EdgeCells {
  const cells = getNeighbours(tree, edge).filter((n) => n.isCell);
  return {
    nodeA: cells[0],
    nodeB: cells[1],
    isConnected: cells[0].isChecked && cells[1].isChecked,
  };
}

function getRandomCell(tree: NodeType[][]): NodeType {
  const rX = Math.floor(Math.random() * tree.length);
  const rY = Math.floor(Math.random() * tree[0].length);

  const cell = tree[rX]?.[rY];

  if (cell && cell.isCell) return cell;

  return getRandomCell(tree);
}
