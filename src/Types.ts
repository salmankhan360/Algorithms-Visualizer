export interface CoordinatesType {
  start: { x: number; y: number };
  finish: { x: number; y: number };
}

export interface NodeType {
  x: number;
  y: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isPath: boolean;
  searching: boolean;
}
