import { NodeType } from "../../Types";

interface SetNode extends NodeType {
  setId: number;
  weight: number;
  isCell: boolean;
}

interface Sets {
  [key: string]: SetNode[];
}

export function kruskalsMaze(tree: SetNode[][]) {
  const wallsInOrder: any = [];
  const rows = tree.length;
  const columns = tree[0].length;

  const edges = [];
  const cells = [];
  const sets: Sets = {};

  let id = 1;

  let ei = 0;
  let ej = 0;
  let oi = 0;
  let oj = 0;
  let i = 0;
  let j = 0;
  let cellHash: any = {};
  let cellHash2: any = {};
  for (i = 0, ei = 1, oi = 1; i < rows - 1; i++, oi += 2, ei += 2) {
    for (j = 0, ej = 1, oj = 1; j < columns - 1; j++, ej += 2, oj += 2) {
      let hashId = `${i}-${j}`;
      let hashid2 = `${ei}-${ej}`;
      cellHash[hashid2] = 1;
      let isBorder = i == 0 || j == 0 || i == rows || j == columns;
      if (cellHash[hashId]) {
        id++;
        tree[i][j].setId = id;
        tree[i][j].isCell = true;
        sets[id] = [tree[i][j]];
      } else if (isBorder) {
        tree[i][j].setId = 0;
        tree[i][j].isCell = true;
        sets[0] = [tree[i][j]];
      } else {
        tree[i][j].weight = Math.random();
        edges.push(tree[i][j]);
      }
    }
  }

  const isVertical = rows > columns ? true : false;
  edges.sort((a, b) => a.weight - b.weight);
  while (edges.length) {
    const node = edges.pop();
    if (node) {
      const { x, y } = node;

      const top = tree[x - 1]?.[y];
      const bottom = tree[x + 1]?.[y];
      const left = tree[x]?.[y - 1];
      const right = tree[x]?.[y + 1];
      if (isVertical) {
        if (!isConnect(top, bottom)) {
          connect(node, top, bottom, sets, wallsInOrder);
          if (!isConnect(left, right))
            connect(node, left, right, sets, wallsInOrder);
        }
      } else {
        if (!isConnect(left, right)) {
          connect(node, left, right, sets, wallsInOrder);
        }
        if (!isConnect(top, bottom)) {
          connect(node, top, bottom, sets, wallsInOrder);
        }
      }
    }
  }
  return wallsInOrder;
}

function isConnect(nodeA: SetNode, nodeB: SetNode) {
  if (nodeA.setId == nodeB.setId) return true;
  return false;
}

function connect(
  node: SetNode,
  nodeA: SetNode,
  nodeB: SetNode,
  sets: Sets,
  wallsInOrder: SetNode[]
) {
  const { setId: idA } = nodeA;
  const { setId: idB } = nodeB;
  console.log("connect", { node, nodeA, nodeB, sets, wallsInOrder });
  if (!idA || !idB) {
    return;
  }
  const setA = sets[idA];
  const setB = sets[idB];
  nodeB.setId = idA;
  node.setId = idA;
  for (let i = 0; i < setB?.length; i++) {
    setB[i].setId = idA;
  }
  setA.push(...setB, node);

  delete sets[idB]; // Not sure about deleting the setB'

  wallsInOrder.push(node, nodeA, nodeB);
  return false;
}
