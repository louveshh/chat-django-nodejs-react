export const clearGrid = (isRunning, grid, finishRow, finishCol) => {
  if (!isRunning) {
    const updatedGrid = grid.slice();
    updatedGrid.forEach((row) => {
      row.forEach((currentNode) => {
        const classId = document.getElementById(
          `grid-cell-${currentNode.row}-${currentNode.col}`
        ).className;
        if (
          classId !== 'grid-cell node-start' &&
          classId !== 'grid-cell node-finish' &&
          classId !== 'grid-cell node-wall'
        ) {
          document.getElementById(
            `grid-cell-${currentNode.row}-${currentNode.col}`
          ).className = 'grid-cell';
          currentNode.isVisited = false;
          currentNode.distance = Infinity;
          currentNode.distanceToFinishNode =
            Math.abs(finishRow - currentNode.row) +
            Math.abs(finishCol - currentNode.col);
        }
        if (classId === 'grid-cell node-finish') {
          currentNode.isVisited = false;
          currentNode.distance = Infinity;
          currentNode.distanceToFinishNode = 0;
        }
        if (classId === 'grid-cell node-start') {
          currentNode.isVisited = false;
          currentNode.distance = Infinity;
          currentNode.distanceToFinishNode =
            Math.abs(finishRow - currentNode.row) +
            Math.abs(finishCol - currentNode.col);
          currentNode.isStart = true;
          currentNode.isWall = false;
          currentNode.previousNode = null;
          currentNode.isNode = true;
        }
      });
    });
  }
};
