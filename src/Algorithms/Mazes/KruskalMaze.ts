import { NodeType, WallsInOrder } from "../../Types";

interface Sets {
  [key: string]: NodeType[];
}
interface CellHash {
  [key: string]: boolean;
}

export default function kruskalsMaze(
  tree: NodeType[][],
  type: "set-spanning" | "normal" = "normal"
) {
  const wallsInOrder: WallsInOrder = [];
  const rows = tree.length;
  const columns = tree[0].length;

  const edges = [];
  const sets: Sets = {};

  let id = 1; // id should not be 0 other wise its gonna be falsy value

  let oi = 0;
  let oj = 0;
  let i = 0;
  let j = 0;
  let cellHash: CellHash = {};
  for (i = 0, oi = 1; i < rows - 1; i++, oi += 2) {
    for (j = 0, oj = 1; j < columns - 1; j++, oj += 2) {
      let hashId = `${i}-${j}`;
      let hashid2 = `${oi}-${oj}`;
      cellHash[hashid2] = true;

      let isBorder = i == 0 || j == 0 || i == rows || j == columns;

      if (!isBorder) {
        if (cellHash[hashId]) {
          id++;
          tree[i][j].setId = id;
          sets[id] = [tree[i][j]];
        } else {
          tree[i][j].weight = Math.random();
          edges.push(tree[i][j]);
        }
      }
    }
  }

  const isVertical = rows > columns ? true : false;
  edges.sort((a: any, b: any) => a.weight - b.weight); // sort by weight

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

  if (type === "set-spanning") return getLongestSet(sets);
  return wallsInOrder;
}

function isConnect(nodeA: NodeType, nodeB: NodeType) {
  if (nodeA.setId == nodeB.setId) return true;
  return false;
}

function connect(
  node: NodeType,
  nodeA: NodeType,
  nodeB: NodeType,
  sets: Sets,
  wallsInOrder: WallsInOrder
) {
  const { setId: idA } = nodeA;
  const { setId: idB } = nodeB;

  if (!idA || !idB) return;

  const setA = sets[idA];
  const setB = sets[idB];
  nodeB.setId = idA;
  node.setId = idA;

  for (let i = 0; i < setB?.length; i++) {
    setB[i].setId = idA;
  }
  setA.push(...setB, node);

  delete sets[idB];

  wallsInOrder.push(node, nodeA, nodeB);
}

function getLongestSet(sets: Sets) {
  let longestSet: NodeType[] = [];
  Object.values(sets).forEach((set) => {
    if (longestSet.length < set.length) longestSet = set;
  });
  return longestSet;
}
