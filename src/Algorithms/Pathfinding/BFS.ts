import { NodeType } from "../../Types";
import { getAllNodes, getNeighbours } from "../../Utils/Pathfinding";

export default function DFS(
  tree: NodeType[][],
  start: NodeType,
  finish: NodeType
) {
  const visitedInOrder: any[] = [];
  //   start.distance = 0;
  //   start.heuristics = 0;
  //   let unvisited = [];
  //   unvisited.push(start);
  //   while (unvisited.length) {
  //     const curr = unvisited.shift();
  //     if (!curr || curr.isWall) continue;
  //     if (curr == finish) {
  //       visitedInOrder.push(finish);
  //       return visitedInOrder;
  //     }
  //     curr.isVisited = true;
  //     visitedInOrder.push(curr);
  //     unvisited = [...unvisited, ...updateNeighbourNodes(tree, curr)];
  //   }
  //   return visitedInOrder;
  return visitedInOrder;
}

// function updateNeighbourNodes(tree: NodeType[][], curr: NodeType) {
//   const neighbours = getNeighbours(tree, curr);
//   const reN: NodeType[] = [];
//   neighbours.forEach((n) => {
//     if (!n.isVisited) {
//       n.previousNode = curr;
//       n.isVisited = true;
//       reN.push(n);
//     }
//   });
//   return reN;
// }
