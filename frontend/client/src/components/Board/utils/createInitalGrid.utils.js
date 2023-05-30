import { configBoard } from "config/config";
export const createInitialGrid = (points, mode) => {
  const node = (row, col, startRow, finishRow, startCol, finishCol) => {
    return {
      row,
      col,
      isStart: row === startRow && col === startCol && mode !== "combo",
      isFinish: row === finishRow && col === finishCol && mode !== "combo",
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(finishRow - row) + Math.abs(finishCol - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };
  const grid = [];
  const { startRow, finishRow, startCol, finishCol } = points;
  const { ROW_COUNT, COLUMN_COUNT } = configBoard;
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow = [];
    for (let col = 0; col < COLUMN_COUNT; col++) {
      currentRow.push(node(row, col, startRow, finishRow, startCol, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};
