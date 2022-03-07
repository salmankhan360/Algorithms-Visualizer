export default function ZigZag(tree: any) {
  const walls = [];
  const rows = tree.length;
  const cols = tree[0].length;
  for (let j = 0; j < cols - 2; j += 2) {
    let wiggle = 0;
    for (let i = 0; i < rows - 2; i++) {
      let node = tree[i]?.[j];
      walls.push(node);
      wiggle++;
    }
  }
  console.log(walls);
  return walls;
}
