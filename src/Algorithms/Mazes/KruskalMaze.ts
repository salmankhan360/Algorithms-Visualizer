import { NodeType } from "../../Types";

export function kruskalsMaze(tree: any) {
  const closed: any = [];
  const sets: any = new Map();
  let idx = 0;
  const wallsInOrder: any = [];

  for (let i = 2; i < tree.length - 2; i += 2) {
    for (let j = 2; j < tree[i].length - 2; j += 2) {
      closed.push(tree[i][j]);
      tree[i][j].idx = idx;
      sets.set(idx++, [tree[i][j]]);
    }
  }
  for (let i = 1; i < tree.length - 1; i += 2) {
    for (let j = 1; j < tree[i].length - 1; j += 2) {
      closed.push(tree[i][j]);
    }
  }

  let open = tree.flat().filter((node: any) => !closed.includes(node));

  while (open.length) {
    const isVertical = Math.random() > 0.5;

    const randomIndex = rand(0, open.length - 1);
    const randomNode = open[randomIndex];
    open = open.filter((e: any) => e !== randomNode);

    if (isVertical) {
      const top = tree[randomNode.x - 1][randomNode.y];
      const bottom = tree[randomNode.x + 1][randomNode.y];

      if (!isConnect(randomNode, top, bottom, sets, wallsInOrder)) {
        isConnect(randomNode, top, bottom, sets, wallsInOrder);
      }
    } else {
      const left = tree[randomNode.x][randomNode.y - 1];
      const right = tree[randomNode.x]?.[randomNode.y + 1];

      if (!isConnect(randomNode, left, right, sets, wallsInOrder)) {
        isConnect(randomNode, left, right, sets, wallsInOrder);
      }
    }
    console.log(wallsInOrder);
  }
  return wallsInOrder;
}

function isConnect(
  currNode: any,
  nodeA: any,
  nodeB: any,
  sets: any,
  wallsInOrder: any = []
) {
  console.log({ currNode, nodeA, nodeB, sets });
  if (nodeA.idx == nodeB.idx) return false;

  let set1 = sets.get(nodeA.idx);
  let set2 = sets.get(nodeB.idx);

  sets.delete(nodeB.idx);

  for (let i = 0; i < set1.length; i++) {
    set2[i].idx = nodeA.idx;
  }

  sets.set(nodeA.idx, [...set1, ...set2]);

  wallsInOrder.push(currNode, nodeA, nodeB);

  return false;
}
function rand(from: any, to: any) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
