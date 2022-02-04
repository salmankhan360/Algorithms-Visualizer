export interface CoordinatesType {
  start: { x: number; y: number };
  finish: { x: number; y: number };
}

export interface NodeType {
  id: number
  x: number;
  y: number;
  distance: number;
  heuristics: number;
  isVisited: boolean;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isPath: boolean;
  searching: boolean;
  previousNode?: NodeType;
}
