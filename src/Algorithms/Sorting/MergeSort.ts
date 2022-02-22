export default function mergeSort(piles: number[]) {
  let statesInOrder: any[] = [];
  mergeSortHelper(piles, 0, piles.length - 1, statesInOrder);
  return statesInOrder;
}

function mergeSortHelper(
  piles: number[],
  start: number,
  end: number,
  statesInOrder: any
) {
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  mergeSortHelper(piles, start, mid, statesInOrder);
  mergeSortHelper(piles, mid + 1, end, statesInOrder);
  merge(piles, start, mid, end, statesInOrder);
}

function merge(
  piles: number[],
  start: number,
  mid: number,
  end: number,
  statesInOrder: any
) {
  let k = start,
    i = start,
    j = mid + 1;
  let pilesC = piles.slice();
  while (i <= mid && j <= end) {
    if (pilesC[i] <= pilesC[j]) {
      piles[k++] = pilesC[i++];
    } else {
      piles[k++] = pilesC[j++];
    }
    const temp = { pile: piles.slice(), index: [i, j, k], type: "merge" };
    statesInOrder.push(temp);
  }
  while (i <= mid) {
    piles[k++] = pilesC[i++];
    const temp = { pile: piles.slice(), index: [i, k], type: "merge" };
    statesInOrder.push(temp);
  }
  while (j <= end) {
    piles[k++] = pilesC[j++];
    const temp = { pile: piles.slice(), index: [j, k], type: "merge" };
    statesInOrder.push(temp);
  }
}
