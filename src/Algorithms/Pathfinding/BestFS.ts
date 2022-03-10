import { NodeType } from "../../Types";
import {
  getNeighbours,
  checkAdjacent,
  getHeuristics,
} from "../../Utils/Pathfinding";
export default function BestFS(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType,
  heuristics = "manhattan"
) {
  start.distance = 0;
  start.heuristics = 0;

  const visitedInOrder = [];
  const queue = [start];
  while (queue.length) {
    sortNodes(queue);
    const curr: any = queue.shift();
    if (curr == finish) {
      visitedInOrder.push(finish);
      return visitedInOrder;
    }
    if (curr.isWall) continue;
    curr.isVisited = true;
    visitedInOrder.push(curr);
    updateNeighbourNodes(tree, queue, curr, finish, heuristics);
  }

  return visitedInOrder;
}

function updateNeighbourNodes(
  tree: NodeType[][],
  queue: NodeType[],
  curr: NodeType,
  finish: NodeType,
  heuristics: string
) {
  const neighbours = getNeighbours(tree, curr);
  neighbours.forEach((n) => {
    if (!n.isVisited) {
      const isAdjacent = checkAdjacent(curr, n);
      n.distance = isAdjacent ? curr.distance + 1 : curr.distance + 0.5;
      n.heuristics = isAdjacent
        ? getHeuristics(n, finish, heuristics)
        : getHeuristics(n, finish, heuristics) + 0.5;
      n.isVisited = true;
      n.previousNode = curr;
      queue.push(n);
    }
  });
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance + a.heuristics - (a.distance + b.heuristics));
}
