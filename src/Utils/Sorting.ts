export function swap(a: number, b: number, arr: number[]) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}
