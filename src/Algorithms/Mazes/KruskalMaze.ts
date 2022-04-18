import { NodeType } from "../../Types";

interface SetNode extends NodeType {
  setId: number;
  weight: number;
}

interface Sets {
  [key: string]: SetNode[];
}

export function kruskalsMaze(tree: SetNode[][]) {
  const wallsInOrder = [];
  const rows = tree.length;
  const columns = tree[0].length;

  const edges = [];
  const cells = [];
  const sets: Sets = {};

  let id = 0;

  let isCell = false;
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < columns - 1; j++) {
      if (isCell) {
        if (i % 2 == 0 || j % 2 == 0) {
          isCell = false;
          id++;
          tree[i][j].setId = id;
          sets[id] = [tree[i][j]];
          wallsInOrder.push(tree[i][j]);
        }
      } else {
        isCell = true;
        tree[i][j].weight = Math.random();
        edges.push(tree[i][j]);
      }
    }
  }

  edges.sort((a, b) => a.weight - b.weight);

  while (edges.length) {
    const node = edges.pop();
    if (node) {
      const { x, y } = node;
      const isVertical = Math.random() > 0.5;

      const top = tree[x - 1][y];
      const bottom = tree[x + 1][y];
      const left = tree[x][y - 1];
      const right = tree[x][y + 1];
      if (isVertical) {
        if (!isConnect(top, bottom)) {
          connect(node, top, bottom, sets, wallsInOrder);
        }
      } else {
        if (!isConnect(left, right))
          connect(node, left, right, sets, wallsInOrder);
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

  const setA = sets[idA];
  const setB = sets[idB];

  for (let i = 0; i < setB.length; i++) {
    setB[i].setId = idA;
  }
  setA.push(...setB);

  delete sets[idB]; // Not sure about deleting the setB'

  wallsInOrder.push(node, nodeA, nodeB);
}
