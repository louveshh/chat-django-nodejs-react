export const clickGrid = (
  row,
  col,
  grid,
  selectedOption,
  isRunning,
  points,
  updateGrid,
  updateStart,
  updateFinish
) => {
  if (typeof grid === 'undefined') {
    return;
  }
  if (grid.length === 0) {
    return;
  }
  if (isRunning) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = points;
  const updatedGrid = grid.slice();
  const currentNode = grid[row][col];
  if (
    !currentNode.isStart &&
    !currentNode.isFinish &&
    currentNode.isNode &&
    selectedOption.value === 'wall'
  ) {
    const updatedNode = {
      ...currentNode,
      isWall: !currentNode.isWall,
    };
    updatedGrid[row][col] = updatedNode;
  } else if (
    currentNode.isNode &&
    !currentNode.isFinish &&
    selectedOption.value === 'start'
  ) {
    const previousStartNode = grid[startRow][startCol];
    const resetStartNode = {
      ...previousStartNode,
      isStart: false,
    };
    updatedGrid[startRow][startCol] = resetStartNode;
    const updatedNode = {
      ...currentNode,
      isWall: false,
      isStart: !currentNode.isStart,
    };
    updatedGrid[row][col] = updatedNode;
    updateStart({ x: row, y: col });
  } else if (
    currentNode.isNode &&
    !currentNode.isStart &&
    selectedOption.value === 'finish'
  ) {
    const previousFinishNode = grid[finishRow][finishCol];
    const resetFinishNode = {
      ...previousFinishNode,
      isFinish: false,
    };
    updatedGrid[finishRow][finishCol] = resetFinishNode;
    const updatedNode = {
      ...currentNode,
      isWall: false,
      isFinish: !currentNode.isFinish,
    };
    updatedGrid[row][col] = updatedNode;
    updateFinish({ x: row, y: col });
  }
  updateGrid(updatedGrid);
};
