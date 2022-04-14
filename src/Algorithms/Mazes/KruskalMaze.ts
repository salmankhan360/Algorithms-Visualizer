import { NodeType } from "../../Types";

export function kruskalsMaze(tree: any) {
  let closed: any = [];
  const sets: any = new Map();
  let idx = 0;
  const wallsInOrder: any = [];

  let maxCol = tree[0].length - 1;
  let maxRow = tree.length - 1;

  let bound = [];
  for (let j = 0; j < maxCol; ++j) {
    let node = tree[0][j];
    node.idx = idx;
    bound.push(node);
    node = tree[maxRow][j];
    node.idx = idx;
    bound.push(node);
  }

  for (let i = 0; i < maxRow; ++i) {
    let node = tree[i][0];
    node.idx = idx;
    bound.push(node);

    node = tree[i][maxCol - 1];
    node.idx = idx;
    bound.push(node);
  }

  closed = closed.concat(bound);
  sets.set(idx++, bound);

  for (let i = 2; i < tree.length - 3; i += 2) {
    for (let j = 2; j < tree[i].length - 3; j += 2) {
      closed.push(tree[i][j]);
      tree[i][j].idx = idx;
      sets.set(idx++, [tree[i][j]]);
      if (tree[i][j].x == 0 || tree[i][j] == 0) {
        console.log({ noderssss: tree[i][j] });
      }
    }
  }
  for (let i = 1; i < tree.length - 2; i += 2) {
    for (let j = 1; j < tree[i].length - 2; j += 2) {
      closed.push(tree[i][j]);
    }
  }

  let open: any = [];

  for (let i = 0; i < tree.length - 1; i++) {
    for (let j = 0; j < tree[i].length - 1; j++) {
      if (!closed.includes(tree[i][j])) {
        open.push(tree[i][j]);
      }
    }
  }
  while (open.length) {
    const isVertical = Math.random() > 0.5;

    const randomIndex = rand(0, open.length - 1);
    const randomNode = open[randomIndex];
    open = open.filter((e: any) => e !== randomNode);

    const { x, y } = randomNode;
    if (isVertical) {
      const top = tree[x - 1][y];
      const bottom = tree[x + 1][y];

      if (!isConnect(randomNode, top, bottom, sets, wallsInOrder)) {
        const left = tree[x][y - 1];
        const right = tree[x][y + 1];
        isConnect(randomNode, left, right, sets, wallsInOrder);
      }
    } else {
      const left = tree[x][y - 1];
      const right = tree[x][y + 1];

      if (!isConnect(randomNode, left, right, sets, wallsInOrder)) {
        const top = tree[x - 1][y];
        const bottom = tree[x + 1][y];

        isConnect(randomNode, top, bottom, sets, wallsInOrder);
      }
    }
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
  if (!set1 || !set2) return;
  console.log({ set1, set2, nodeAIDX: nodeA.idx, nodeBIDX: nodeB.idx });

  sets.delete(nodeB.idx);

  for (let i = 0; i < set2.length; i++) {
    set2[i].idx = nodeA.idx;
  }

  sets.set(nodeA.idx, set1.concat(set2));
  currNode.idx = nodeA.idx;

  wallsInOrder.push(currNode, nodeA, nodeB);

  return true;
}
function rand(from: any, to: any) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
