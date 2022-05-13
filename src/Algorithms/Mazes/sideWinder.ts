import { NodeType } from "../../Types";

export default function sideWinder(tree: NodeType[][]) {
  const wallsInOrder: any = [];
  const rows = tree.length;

  for (let i = 1; i < rows; i += 2) {
    let run = [];

    for (let j = 1; j < tree[0].length - 1; j++) {
      const isCarve = Math.random() > 0.5;

      if ((isCarve || !run.length)&& j != tree[0].length - 2) {
        wallsInOrder.push(tree[i][j]);
        run.push(tree[i][j]);
        continue;
      } else if(j == tree[0].length - 2){
        const n = tree[i][j];
        
          const { x, y } = n;
          run = [];
          if(wallsInOrder.includes(tree[x - 2]?.[y])){

          wallsInOrder.push({ x: x-1, y: y });
          }

      } else {
        const n = getAWall(run, tree, wallsInOrder);
        if (n) {
          const { x, y } = n;
          run = [];
          wallsInOrder.push({ x: x-1, y: y });
          continue;
        }
      }
      wallsInOrder.push(tree[i][j]);
    }
  }
  return wallsInOrder;
}

function getAWall(
  run: NodeType[],
  tree: NodeType[][],
  wallsInOrder: NodeType[]
): NodeType | undefined {
  let ne;

  run.forEach((n) => {
    n.weight = Math.random();
  });

  ne = run.find((n) => {
    const { x, y } = n;
    if (wallsInOrder.includes(tree[x - 2]?.[y])) {
      return true
    }
  });

  return ne;
}
