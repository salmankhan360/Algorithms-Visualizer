import { finished } from "stream";
import { NodeType } from "../../Types";

export default function djikstra(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType
) {
  const unvisited: NodeType[] = [];
  tree.forEach((col) => col.forEach((node) => unvisited.push(node)));
  const { x, y } = start;
  tree[x][y].distance = 1;
  const visitedNodes: NodeType[] = [];
  while (unvisited.length) {
    unvisited.sort((a, b) => a.distance - b.distance);
    const closest = unvisited.shift();
    if (!closest || closest.isWall) continue;
    if (closest == finish)
      console.log(finish.x, finish.y, " ww", start.x, start.y);
    closest.isVisited = true;
    // console.log(visitedNodes);
    closest && visitedNodes.push(closest);
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
