function swap(a:number, b:  number, arr:number[]) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}
export default function bubbleSort(array: number[]) {
  let sortedInOrder: any = []
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // -i because the largest element will be bubbled at the end so we don't have to compare.
      if (array[j] > array[j + 1]) {
        swap(j, j + 1, array);
        sortedInOrder = [...sortedInOrder, {pile: [...array], index: [j, j + 1]}]
      }
    }
  }
  return sortedInOrder;
}