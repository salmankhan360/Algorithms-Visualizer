import { swap } from "../../Utils/Sorting";

export default function insertionSort(piles: number[]) {
  let statesInOrder = [];
  for (let i = 1; i < piles.length; i++) {
    for (let j = i; j > 0 && piles[j - 1] > piles[j]; j--) {
      swap(j, j - 1, piles);
      const temp = { pile: piles.slice(), index: [j, j - 1] };
      statesInOrder.push(temp);
    }
  }
  return statesInOrder;
}
