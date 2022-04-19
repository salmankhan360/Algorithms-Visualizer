import { NodeType } from "../../Types";
import { getNeighbours } from "../../Utils/Pathfinding";

export default function DFS(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType,
  heuristics = "manhattan", // We dont need that in here
  diagonal: boolean
) {
  const visitedInOrder = [];
  start.distance = 0;
  start.heuristics = 0;
  let unvisited = [];
  unvisited.push(start);
  while (unvisited.length) {
    const curr: any = unvisited.shift();
    if (!curr || curr.isWall) continue;
    if (curr == finish) {
      visitedInOrder.push(finish);
      return visitedInOrder;
    }
    curr.isVisited = true;
    visitedInOrder.push(curr);
    unvisited = [...unvisited, ...updateNeighbourNodes(tree, curr, diagonal)];
  }
  return visitedInOrder;
}

function updateNeighbourNodes(
  tree: NodeType[][],
  curr: NodeType,
  diagonal: boolean
) {
  const neighbours = getNeighbours(tree, curr, diagonal);
  const reN: NodeType[] = [];
  neighbours.forEach((n) => {
    if (!n.isVisited && !n.previousNode) {
      n.distance = curr.distance + 1;
      n.previousNode = curr;
      n.isVisited = true;
      reN.push(n);
    }
  });
  return reN;
}
