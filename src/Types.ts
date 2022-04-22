export interface CoordinatesType {
  start: { x: number; y: number };
  finish: { x: number; y: number };
  bomb?: { x: number; y: number };
}

export interface NodeType {
  id: number;
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
  isBomb?: boolean;
  weight?: number;
  setId?: number;

  // For Mazes
  isCell?: boolean;
  isEdge?: boolean;
  isChecked?: boolean;
}

interface WallInOrder {
  x: number;
  y: number;
  [key: string]: any;
}

export type WallsInOrder = WallInOrder[];
