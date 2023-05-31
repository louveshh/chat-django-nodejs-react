export const clickGrid = (
  row,
  col,
  grid,
  selectedOption,
  points,
  updateGrid,
  updateStartRow,
  updateFinishRow,
  updateStartCol,
  updateFinishCol
) => {
  if (grid === undefined) {
    return;
  }
  if (grid.length === 0) {
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
    updateStartRow(row);
    updateStartCol(col);
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
    updateFinishRow(row);
    updateFinishCol(col);
  }
  updateGrid(updatedGrid);
};
