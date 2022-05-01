
import { playNote } from "../../../Utils/Pathfinding";

export function genRandomArray(
  size: number,
  max: number,
  arr: number[] = []
): number[] {
  for (let i = 0; i < size; ) {
    const unique = Math.floor(Math.random() * max);
    if (arr.includes(unique)) {
      continue;
    } else {
      i++;
      arr.push(unique);
    }
  }
  return arr;
}
export const getHeight = (value: number, max: number) => (value / max) * 100;

export const visualize = (
  inOrder: any,
  speed: number,
  audioNote: "sine" | "square" | "triangle" | "sawtooth" | "off",
  setArr: (arr: number[]) => void,
  onFinish: (finishPile: number[]) => void,
  onStart: (timeouts: any) => void
) => {
  if (!inOrder.length) {
    onFinish([]);
    return;
  }
  const allTimeouts: any = [];
  inOrder?.forEach((node: any, i: any) => {
    const timeoutBar = setTimeout(() => {
      const {
        pile,
        index: [k, j, z],
        pivote,
        type,
      } = node;

      if (type == "merge") {
        addUniqueClass("sortSearch1", String(j));
        addUniqueClass("sortSearch2", String(k));
        addUniqueClass("sortSearch3", String(z));
        playSound(j, pile.length, audioNote);
        playSound(k, pile.length, audioNote);
        playSound(z, pile.length, audioNote);
        setArr(pile);
      } else if (pivote) {
        performSwap(j, k, speed, audioNote == "off");
        performPivote(String(pivote));
        playSound(j, pile.length, audioNote);
      } else {
        playSound(j, pile.length, audioNote);
        performSwap(j, k, speed, audioNote == "off");
      }
    }, i * speed);
    allTimeouts.push(timeoutBar);
  });
  const timeout2 = setTimeout(
    () => [onFinish(inOrder[inOrder.length - 1].pile), resetAllClasses()],
    (inOrder.length - 1) * speed
  );
  allTimeouts.push(timeout2);
  onStart(allTimeouts);
};

function performPivote(id: string) {
  const node = document.getElementById(id);
  const tweekNode = document.getElementById("innerTweek");
  addUniqueClass("pivote", id);
  addUniqueClass("pivote-line", "innerTweek");
  if (!node || !tweekNode) return;
  tweekNode.style.height = getComputedStyle(node).height;
}

function performSwap(i: number, j: number, speed: number, playSwap: boolean = true) {
  if (i !== j && playSwap)  {
    const speedPlay = (speed / 500) * 7;
    const audio: any = document.getElementById("swap");
    audio.playbackRate = 10 - speedPlay;
    audio.play();
  }
  const curr: any = document.getElementById(String(i));
  const next: any = document.getElementById(String(j));
  const currCopy = JSON.parse(JSON.stringify(curr.style.left));
  curr.style.left = next.style.left;
  next.style.left = currCopy;
  addUniqueClass("sortSearch1", String(i));
  addUniqueClass("sortSearch2", String(j));
  next.id = String(i);
  curr.id = String(j);
}

export function addUniqueClass(className: string, id: string = "") {
  const allClasses = document.querySelectorAll(`.${className}`);
  allClasses.forEach((node: any) => {
    node.classList.remove(className);
  });
  if (id) document.getElementById(id)?.classList.add(className);
}

export function resetAllClasses() {
  document.querySelectorAll(".bar, #innerTweek").forEach((node: any) => {
    node.classList.remove("sortSearch1");
    node.classList.remove("sortSearch2");
    node.classList.remove("pivote");
    node.classList.remove("pivote");
    node.classList.remove("pivote-line");
  });
}

export function resetBars(array: number[]) {
  const firstNode = document.getElementById("0");
  if (!firstNode) return;

  array.forEach((bar: any, i) => {
    const dups: any = document.querySelectorAll(`.bar-${bar}`);
    dups.forEach((node: any) => {
      const left = `${i * 35}px`;
      node.id = String(i);
      node.style.left = left;
    });
  });
}


function playSound(val: number, total:number, noteType: "sine" | "square" | "triangle" | "sawtooth" | "off") {
  if (noteType == "off") return;
  const percent = val / total;
  const maxFreq = 1000;
  const perc = percent * maxFreq;
  const transition = 0.1;
  playNote(perc, noteType, transition);
}