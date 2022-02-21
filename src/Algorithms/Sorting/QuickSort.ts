function partition(
  arr: number[],
  low: number,
  high: number,
  sortedInOrder: any = []
) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      sortedInOrder.push({ pile: [...arr], index: [j, i], pivote: high });
    }
  }
  sortedInOrder.push({ pile: [...arr], index: [i + 1, high] });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(
  arr: number[],
  low = 0,
  high = arr.length - 1,
  sortedInOrder: any = []
) {
  if (low < high) {
    let pi = partition(arr, low, high, sortedInOrder);
    quickSort(arr, low, pi - 1, sortedInOrder);
    quickSort(arr, pi + 1, high, sortedInOrder);
  }
  return sortedInOrder;
}

export default quickSort;
