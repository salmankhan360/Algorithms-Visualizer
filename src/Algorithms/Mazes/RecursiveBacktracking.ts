import { EdgesensorHigh } from "@mui/icons-material";
import { NodeType, WallsInOrder } from "../../Types";
import { getNeighbours } from "../../Utils/Pathfinding";

export default function RecursiveBacktracking(tree: NodeType[][]) {
  const wallsInOrder: WallsInOrder = [];
  const rows = tree.length;
  const columns = tree[0].length;
  const cells = [];
  const edges = [];
  const all = [];
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
        if (cellHash[hashId]) {
          tree[i][j].isCell = true;
        } else {
          tree[i][j].weight = Math.random();
          tree[i][j].isEdge = true;
        }
        all.push(tree[i][j]);
      }
    }
  }

  const startCell = getRandomCell(tree);
  const que = [startCell];
  while (que.length) {
    const currCell = que.pop();

    if (currCell) {
      const { cell, edge }: any = getUnvisitedNeighbour(currCell, tree);

      if (cell) {
        // currCell.isChecked = true;
        cell.isChecked = true;
        wallsInOrder.push(currCell,edge,cell );
        que.push(currCell, cell);
      }
    }
  }
  return wallsInOrder;
}

function getUnvisitedNeighbour(node: NodeType, tree: NodeType[][]) {
  const edges = getNeighbours(tree, node);

  const neighbours: any = [];
  edges.forEach((edge: any) => {
    const edgeNeighbours = getNeighbours(tree, edge);
    edgeNeighbours.forEach((n) => {
      if (n !== node && n.isCell && !n.isChecked)
        neighbours.push({ cell: n, edge });
    });
  });
  const r = Math.floor(Math.random() * neighbours.length);
  if (neighbours[r]) return neighbours[r];
  return false;
}

function getRandomCell(tree: NodeType[][]): NodeType {
  const rX = Math.floor(Math.random() * tree.length);
  const rY = Math.floor(Math.random() * tree[0].length);

  const cell = tree[rX]?.[rY];

  if (cell && cell.isCell) return cell;

  return getRandomCell(tree);
}
