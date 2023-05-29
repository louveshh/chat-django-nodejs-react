export const node = (
  row,
  col,
  startNodeRow,
  finishNodeRow,
  startNodeCol,
  finishNodeCol
) => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    distanceToFinishNode:
      Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col),
    isVisited: false,
    isWall: false,
    previousNode: null,
    isNode: true,
  };
};
