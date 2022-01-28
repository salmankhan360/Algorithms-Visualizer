import { NodeType } from "../../Types";
import { getAllNodes, getNeighbours } from "../../Utils/Pathfinding";
export default function AStar(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType
) {
  start.distance = 0;
  start.heuristics = 0;
  const unvisitedNodes = getAllNodes(tree);
  const visitedInOrder: NodeType[] = [];
  while (unvisitedNodes.length) {
    sortNodes(unvisitedNodes);
    const curr = unvisitedNodes.shift();
    if (!curr || curr.isWall) continue;
    if (curr == finish) return visitedInOrder;
    curr.isVisited = true;
    visitedInOrder.push(curr);
    updateNeighbourNodes(tree, curr, finish);
  }
}

function updateNeighbourNodes(
  tree: NodeType[][],
  curr: NodeType,
  finish: NodeType
) {
  const neighbours = getNeighbours(tree, curr);
  neighbours.forEach((n) => {
    if (!n.isVisited) {
      n.distance = curr.distance + 1;
      n.heuristics = getManhatanDistance(n, finish);
      n.previousNode = curr;
    }
  });
}

function getManhatanDistance(node: NodeType, finish: NodeType) {
  const { x: cX, y: cY } = node;
  const { x: fX, y: fY } = finish;
  return Math.abs(cX - fX) + Math.abs(cY - fY);
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance + a.heuristics - (a.distance + b.heuristics));
}
export {};
