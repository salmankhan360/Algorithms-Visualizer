
let grid;
export default function RecursiveDivision(tree) {
  grid = tree.map((row) => row.map(({ x, y }) => ({ x, y })));
  const wallsInOrder = []

 recursiveDivisionMaze(
    grid,
    2,
     grid.length - 3,
    2,
    grid[0].length - 3,
    'horizontal',
    false,
    wallsInOrder,
  )


  return wallsInOrder
}


function recursiveDivisionMaze(
  tree,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls,
  wallsInOrder
) {

  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
   tree.forEach((row) => row.forEach(({x, y})=> {
     
       if (
         x === 0 ||
         y === 0 ||
         x === tree.length - 1 ||
         y === tree[0].length - 1
       ) {
         wallsInOrder.push({ x, y });
    
       }
   }));

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
   tree.forEach(row=> row.forEach(({x,y}) => {
   
      if (
        x === currentRow &&
        y !== colRandom &&
       y >= colStart - 1 &&
        y <= colEnd + 1
      ) {
     console.log({orientation, x, y})
          wallsInOrder.push({ x, y });
         
      }
    }));
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
    tree.forEach((row)=> row.forEach(({x, y}) => {

      if (
        y === currentCol &&
        x !== rowRandom &&
        x >= rowStart - 1 &&
        x <= rowEnd + 1
      ) {
      console.log({orientation, x, y})
       wallsInOrder.push({ x, y });
      }
    }));

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


