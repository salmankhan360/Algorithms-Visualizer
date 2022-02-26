import { NodeType } from "../Types";

export function getNeighbours(tree: NodeType[][], node: NodeType) {
  const { x, y } = node;
  const neighbours = [];
  tree[x - 1]?.[y] && neighbours.push(tree[x - 1][y]);
  tree[x + 1]?.[y] && neighbours.push(tree[x + 1][y]);
  tree[x][y - 1] && neighbours.push(tree[x][y - 1]);
  tree[x][y + 1] && neighbours.push(tree[x][y + 1]);
  return neighbours;
}

export function getAllNodes(tree: NodeType[][]) {
  const nodes: NodeType[] = [];
  tree.forEach((c) => c.forEach((n) => nodes.push(n)));
  return nodes;
}
