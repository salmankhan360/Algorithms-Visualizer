import { NodeType } from "../../Types";
import {
  getAllNodes,
  getNeighbours,
  checkAdjacent,
  getHeuristics,
} from "../../Utils/Pathfinding";
export default function AStar(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType,
  heuristics = "manhattan"
) {
  start.distance = 0;
  start.heuristics = 0;
  const unvisitedNodes = getAllNodes(tree);
  const visitedInOrder: NodeType[] = [];
  while (unvisitedNodes.length) {
    sortNodes(unvisitedNodes);
    const curr = unvisitedNodes.shift();
    if (!curr || curr.isWall) continue;
    if (curr == finish) {
      visitedInOrder.push(finish);
      return visitedInOrder;
    }
    if (curr.distance == Infinity || curr.heuristics == Infinity)
      return visitedInOrder;
    curr.isVisited = true;
    visitedInOrder.push(curr);
    updateNeighbourNodes(tree, curr, finish, heuristics);
  }
  return visitedInOrder;
}

function updateNeighbourNodes(
  tree: NodeType[][],
  curr: NodeType,
  finish: NodeType,
  heuristics: string
) {
  const neighbours = getNeighbours(tree, curr);
  neighbours.forEach((n) => {
    if (!n.isVisited && !n.previousNode) {
      const isAdjacent = checkAdjacent(curr, n);
      n.distance = isAdjacent ? curr.distance + 1 : curr.distance + 1.5;
      const heuristicsDist = getHeuristics(n, finish, heuristics);
      n.heuristics = isAdjacent ? heuristicsDist : heuristicsDist + 1.5;
      n.previousNode = curr;
    }
  });
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance + a.heuristics - (a.distance + b.heuristics));
}
