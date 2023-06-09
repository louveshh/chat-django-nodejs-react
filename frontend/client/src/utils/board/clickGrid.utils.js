export const clickGrid = (
  row,
  col,
  selectedOption,
  pathingInProgress,
  memoGrid,
  memoPoints,
  updateStart,
  updateFinish,
  updateGrid
) => {
  if (typeof memoGrid === 'undefined') {
    return;
  }
  if (memoGrid.length === 0) {
    return;
  }
  if (pathingInProgress) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = memoPoints;
  const updatedGrid = memoGrid.slice();
  const currentNode = memoGrid[row][col];
  if (!currentNode.isStart && !currentNode.isFinish && currentNode.isNode && selectedOption.value === 'wall') {
    const updatedNode = {
      ...currentNode,
      isWall: !currentNode.isWall,
    };
    console.log(updatedNode);
    updatedGrid[row][col] = updatedNode;
  } else if (currentNode.isNode && !currentNode.isFinish && selectedOption.value === 'start') {
    const previousStartNode = memoGrid[startRow][startCol];
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
  } else if (currentNode.isNode && !currentNode.isStart && selectedOption.value === 'finish') {
    const previousFinishNode = memoGrid[finishRow][finishCol];
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
