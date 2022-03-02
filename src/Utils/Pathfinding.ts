import { NodeType } from "../Types";

export function getNeighbours(tree: NodeType[][], node: NodeType) {
  const { x, y } = node;
  const neighbours = [];
  tree[x + 1]?.[y] && neighbours.push(tree[x + 1][y]);
  tree[x - 1]?.[y] && neighbours.push(tree[x - 1][y]);
  tree[x]?.[y - 1] && neighbours.push(tree[x][y - 1]);
  tree[x]?.[y + 1] && neighbours.push(tree[x][y + 1]);
  tree[x - 1]?.[y - 1] && neighbours.push(tree[x - 1][y - 1]);
  tree[x + 1]?.[y - 1] && neighbours.push(tree[x + 1][y - 1]);
  tree[x + 1]?.[y + 1] && neighbours.push(tree[x + 1][y + 1]);
  tree[x - 1]?.[y + 1] && neighbours.push(tree[x - 1][y + 1]);
  return neighbours;
}

export function checkAdjacent(closest: NodeType, n: NodeType) {
  const x = closest.x - n.x;
  const y = closest.y - n.y;
  if (x == 1 && y == 0) return true;
  if (x == -1 && y == 0) return true;
  if (x == 0 && y == 1) return true;
  if (x == 0 && y == -1) return true;
  return false;
}

export function getAllNodes(tree: NodeType[][]) {
  const nodes: NodeType[] = [];
  tree.forEach((c) => c.forEach((n) => nodes.push(n)));
  return nodes;
}

export function getManhatanDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.abs(cX - fX) + Math.abs(cY - fY);
}

export function getEuclideanDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.sqrt(Math.pow(cX - fX, 2) + Math.pow(cY - fY, 2));
}
export function getOctileDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  const dx = Math.abs(cX - fX);
  const dy = Math.abs(cY - fY);
  return dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy);
}
export function getChebyshevDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.max(Math.abs(cX - fX), Math.abs(cY - fY));
}

const allHeuristics: any = {
  manhattan: getManhatanDistance,
  euclidean: getEuclideanDistance,
  octile: getOctileDistance,
  chebyshev: getChebyshevDistance,
};
export function getHeuristics(
  node: NodeType,
  finish: NodeType,
  heuristics: string
) {
  const { x: cX, y: cY } = node;
  const { x: fX, y: fY } = finish;
  return allHeuristics[heuristics](cX, cY, fX, fY);
}
