import { NodeType } from "../../Types";

export default function RecursiveDivision(tree: NodeType[][]) {
  const wallsInOrder: { x: number; y: number }[] = [];
  recursiveDivisionMaze(
    tree,
    2,
    tree.length - 3,
    2,
    tree[0].length - 3,
    "horizontal",
    false,
    wallsInOrder
  );
  return wallsInOrder;
}

function recursiveDivisionMaze(
  tree: NodeType[][],
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
  orientation: "vertical" | "horizontal",
  surroundingWalls: boolean,
  wallsInOrder: { x: number; y: number }[]
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    tree.forEach((row) =>
      row.forEach(({ x, y }) => {
        if (
          x === 0 ||
          y === 0 ||
          x === tree.length - 1 ||
          y === tree[0].length - 1
        ) {
          wallsInOrder.push({ x, y });
        }
      })
    );

    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    for (let i = colStart - 1; i <= colEnd + 1; i++) {
      if (i !== colRandom && i >= colStart - 1 && i <= colEnd + 1) {
        wallsInOrder.push({ x: currentRow, y: i });
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        tree,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        wallsInOrder
      );
    } else {
      recursiveDivisionMaze(
        tree,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        wallsInOrder
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        tree,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        wallsInOrder
      );
    } else {
      recursiveDivisionMaze(
        tree,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        wallsInOrder
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    for (let i = rowStart - 1; i <= rowEnd + 1; i++) {
      if (i !== rowRandom && i >= rowStart - 1 && i <= rowEnd + 1) {
        wallsInOrder.push({ x: i, y: currentCol });
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        tree,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        wallsInOrder
      );
    } else {
      recursiveDivisionMaze(
        tree,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        wallsInOrder
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        tree,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        wallsInOrder
      );
    } else {
      recursiveDivisionMaze(
        tree,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        wallsInOrder
      );
    }
  }
}
