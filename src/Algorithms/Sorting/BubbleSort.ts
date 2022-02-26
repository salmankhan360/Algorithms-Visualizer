import { swap } from "../../Utils/Sorting";

export default function bubbleSort(array: number[]) {
  let sortedInOrder: any = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(j, j + 1, array);
        sortedInOrder = [
          ...sortedInOrder,
          { pile: [...array], index: [j, j + 1] },
        ];
      }
    }
  }
  return sortedInOrder;
}
