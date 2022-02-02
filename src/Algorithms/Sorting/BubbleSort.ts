export function bubbleSort(arr: number[]) {
  let arrCopy = arr.slice();
  const sortedInOrder = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      //   sortedInOrder.push(arr[i]);
      if (arr[i - 1] < arr[j]) {
        const temp = arrCopy[i - 1];
        arrCopy[i - 1] = arrCopy[j];
        arrCopy[j] = temp;
      }
      sortedInOrder.push({ pile: arrCopy, changing: [i - 1, j] });
    }
  }
  console.log(arrCopy, "sorted");
  return sortedInOrder;
}
