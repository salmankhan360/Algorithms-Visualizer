import { NodeType } from "../Types";

export function getNeighbours(
  tree: NodeType[][],
  node: NodeType,
  allowDiagonal = false
) {
  const { x, y } = node;
  const neighbours = [];
  tree[x + 1]?.[y] && neighbours.push(tree[x + 1][y]);
  tree[x - 1]?.[y] && neighbours.push(tree[x - 1][y]);
  tree[x]?.[y - 1] && neighbours.push(tree[x][y - 1]);
  tree[x]?.[y + 1] && neighbours.push(tree[x][y + 1]);

  if (allowDiagonal) {
    tree[x - 1]?.[y - 1] && neighbours.push(tree[x - 1][y - 1]);
    tree[x + 1]?.[y - 1] && neighbours.push(tree[x + 1][y - 1]);
    tree[x + 1]?.[y + 1] && neighbours.push(tree[x + 1][y + 1]);
    tree[x - 1]?.[y + 1] && neighbours.push(tree[x - 1][y + 1]);
  }
  return neighbours;
}

export function checkAdjacent(closest: NodeType, n: NodeType) {
  const x = closest.x - n.x;
  const y = closest.y - n.y;
  if (x == 1 && y == 0) return true;
  if (x == -1 && y == 0) return true;
  if (x == 0 && y == 1) return true;
  if (x == 0 && y == -1) return true;
  return false;
}

export function getAllNodes(tree: NodeType[][]) {
  const nodes: NodeType[] = [];
  tree.forEach((c) => c.forEach((n) => nodes.push(n)));
  return nodes;
}

export function changePrevNodes(node: any, node2: any) {
  if (node.previousNode) {
    changePrevNodes(node.previousNode, node2);
  } else {
    node.previousNode = node2;
  }
}
export function sortByProp(arr: any, prop: string, direction = "asc") {
  arr.sort((a: any, b: any) => {
    if (direction === "asc") {
      return a[prop] - b[prop];
    }
    return b[prop] - a[prop];
  });
}
export function getManhatanDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.abs(cX - fX) + Math.abs(cY - fY);
}

export function getEuclideanDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.sqrt(Math.pow(cX - fX, 2) + Math.pow(cY - fY, 2));
}
export function getOctileDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  const dx = Math.abs(cX - fX);
  const dy = Math.abs(cY - fY);
  return dx + dy + (Math.sqrt(2) - 2) * Math.min(dx, dy);
}
export function getChebyshevDistance(
  cX: number,
  cY: number,
  fX: number,
  fY: number
) {
  return Math.max(Math.abs(cX - fX), Math.abs(cY - fY));
}

const allHeuristics: any = {
  manhattan: getManhatanDistance,
  euclidean: getEuclideanDistance,
  octile: getOctileDistance,
  chebyshev: getChebyshevDistance,
};
export function getHeuristics(
  node: NodeType,
  finish: NodeType,
  heuristics: string
) {
  const { x: cX, y: cY } = node;
  const { x: fX, y: fY } = finish;
  return allHeuristics[heuristics](cX, cY, fX, fY);
}

let windowC: any = window; // had to do it to remove TS error
var ctx: any = new (windowC.AudioContext || windowC.webkitAudioContext)();
var osc = ctx.createOscillator();
var volume = ctx.createGain();
osc.type = "sine";
osc.connect(volume);
volume.connect(ctx.destination);
volume.gain.value = 0;
osc.start();

let pausedByFunc = false;
function playNote(
  frequency: number,
  noteType: "sine" | "square" | "sawtooth" | "triangle"
) {
  const tag: any = document.getElementById("currSound");
  const pauser = document.getElementById("audio-pauser");
  if (!tag.paused) {
    pauser?.click();
    tag.pause();
    pausedByFunc = true;
  }
  osc.type = noteType;
  volume.gain.value = tag.volume;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  osc.resume();
}

export function playNodeSound(
  x: number,
  y: number,
  maxRow: number,
  maxCol: number,
  noteType: "sine" | "square" | "sawtooth" | "triangle"
) {
  const total = maxRow + maxCol;
  const percent = (x + y) / total;
  const maxFreq = 1000;
  const perc = percent * maxFreq;
  playNote(perc, noteType);
}

export function stopNote() {
  volume.gain.value = 0;
  if (pausedByFunc) {
    const tag: any = document.getElementById("currSound");
    const player: any = document.getElementById("audio-player");
    tag.play();
    player.click();
    pausedByFunc = false;
  }
}
