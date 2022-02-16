export default function mergeSort(arr: number[], speed: number) {
  console.log(arr);
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), speed);
  const right = mergeSort(arr.slice(mid), speed);
}
