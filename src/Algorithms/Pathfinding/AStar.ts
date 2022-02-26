import { NodeType } from "../../Types";
import { getAllNodes, getNeighbours } from "../../Utils/Pathfinding";
export default function AStar(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType,
  heuristics = "manhattan"
) {
  console.log(heuristics);
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
    if (!n.isVisited) {
      n.distance = curr.distance + 1;
      n.heuristics = getHeuristics(n, finish, heuristics);
      n.previousNode = curr;
    }
  });
}

function getManhatanDistance(cX: number, cY: number, fX: number, fY: number) {
  return Math.abs(cX - fX) + Math.abs(cY - fY);
}

function getEuclideanDistance(cX: number, cY: number, fX: number, fY: number) {
  return Math.sqrt(Math.pow(cX - fX, 2) + Math.pow(cY - fY, 2));
}
function getOctileDistance(cX: number, cY: number, fX: number, fY: number) {
  const dx = Math.abs(cX - fX);
  const dy = Math.abs(cY - fY);
  return dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy);
}
function getChebyshevDistance(cX: number, cY: number, fX: number, fY: number) {
  return Math.max(Math.abs(cX - fX), Math.abs(cY - fY));
}

const allHeuristics: any = {
  manhattan: getManhatanDistance,
  euclidean: getEuclideanDistance,
  octile: getOctileDistance,
  chebyshev: getChebyshevDistance,
};
function getHeuristics(node: NodeType, finish: NodeType, heuristics: string) {
  const { x: cX, y: cY } = node;
  const { x: fX, y: fY } = finish;
  return allHeuristics[heuristics](cX, cY, fX, fY);
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance + a.heuristics - (a.distance + b.heuristics));
}
