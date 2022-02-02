export function genRandomArray(size: number, max: number) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

export const getHeight = (value: number, max: number) => (value / max) * 100;
