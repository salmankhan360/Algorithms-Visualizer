export function genRandomArray(size: number, max: number) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

export const getHeight = (value: number, max: number) => (value / max) * 100;

export const visualize = (
  inOrder: any,
  speed: number,
  setArr: (arr: number[]) => void,
  onFinish: () => void
) => {
  if (!inOrder.length) {
    onFinish();
    return;
  }
  inOrder?.forEach((node: any, i: any) => {
    setTimeout(() => {
      const {
        pile,
        index: [_, j],
      } = node;
      const curr: any = document.getElementById(j);
      const prev: any = document.getElementById(
        String(inOrder[i - 1]?.index[1])
      );
      prev.classList.remove("sortSearch");
      curr.classList.add("sortSearch");
      if (i === inOrder.length - 1) {
        curr.classList.remove("sortSearch");
        onFinish();
      }
      setArr(pile);
    }, i * speed);
  });
};
