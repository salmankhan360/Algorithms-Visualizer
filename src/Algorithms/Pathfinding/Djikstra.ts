import { finished } from "stream";
import { NodeType } from "../../Types";
import {
  getNeighbours,
  getAllNodes,
  checkAdjacent,
} from "../../Utils/Pathfinding";

export default function djikstra(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType
) {
  start.distance = 1;
  const unvisited = getAllNodes(tree);
  const visitedInOrder: NodeType[] = [];

  while (unvisited.length) {
    sortNodes(unvisited);
    const closest = unvisited.shift();
    if (!closest || closest.isWall) {
      continue;
    }
    if (closest == finish) {
      visitedInOrder.push(finish);
      return visitedInOrder;
    }
    if (closest.distance == Infinity) return visitedInOrder;
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
  const neighbours = getNeighbours(tree, closest);
  neighbours.forEach((n) => {
    if (!n.isVisited && !n.previousNode) {
      const isAdjacent = checkAdjacent(closest, n);
      n.distance = isAdjacent ? closest.distance + 1 : closest.distance + 1.5;
      n.previousNode = closest;
    }
  });
}

function sortNodes(nodes: NodeType[]) {
  nodes.sort((a, b) => a.distance - b.distance);
}
