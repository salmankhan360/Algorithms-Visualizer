import { finished } from "stream";
import { NodeType } from "../../Types";

export default function djikstra(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType
) {
  start.distance = 1;
  const unvisited = allNodes(tree);
  const visitedInOrder: NodeType[] = [];

  while (unvisited.length) {
    sortNodes(unvisited);
    const closest = unvisited.shift();
    if (!closest || closest.isWall) continue;
    if (closest == finish) {
      visitedInOrder.push(finish);
      return visitedInOrder;
    }
    closest.isVisited = true;
    visitedInOrder.push(closest);
    updateUnvisitedNodes(closest, tree);
  }
}

function updateUnvisitedNodes(
  closest: NodeType | undefined,
  tree: NodeType[][]
) {
  if (!closest) return;
  const { x, y } = closest;
  const neighbours = [];
  tree[x - 1]?.[y] && neighbours.push(tree[x - 1][y]);
  tree[x + 1]?.[y] && neighbours.push(tree[x + 1][y]);
  tree[x][y - 1] && neighbours.push(tree[x][y - 1]);
  tree[x][y + 1] && neighbours.push(tree[x][y + 1]);

  neighbours.forEach((n) => {
    if (!n.isVisited) {
      n.previousNode = closest;
      n.distance = closest.distance + 1;
    }
  });
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function allNodes(tree: NodeType[][]) {
  const nodes: NodeType[] = [];
  tree.forEach((c) => c.forEach((n) => nodes.push(n)));
  return nodes;
}
