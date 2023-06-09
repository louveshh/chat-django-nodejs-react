import { configDisplay } from 'config/config';

export const createInitialGrid = (points, mode) => {
  const node = (row, col, startRow, finishRow, startCol, finishCol) => ({
    row,
    col,
    isStart: row === startRow && col === startCol && mode !== 'combo',
    isFinish: row === finishRow && col === finishCol && mode !== 'combo',
    distance: Infinity,
    distanceToFinishNode: Math.abs(finishRow - row) + Math.abs(finishCol - col),
    isVisited: false,
    isWall: false,
    previousNode: null,
    isNode: true,
  });
  const grid = [];
  const { startRow, finishRow, startCol, finishCol } = points;
  for (let row = 0; row < configDisplay.AMOUNT_OF_CELLS; row++) {
    const currentRow = [];
    for (let col = 0; col < configDisplay.AMOUNT_OF_CELLS; col++) {
      currentRow.push(node(row, col, startRow, finishRow, startCol, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};
