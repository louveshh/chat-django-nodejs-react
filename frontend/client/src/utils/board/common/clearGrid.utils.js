export const clearGrid = (isRunning, grid, finishRow, finishCol) => {
  if (!isRunning) {
    const updatedGrid = grid.slice();
    updatedGrid.forEach((row) => {
      row.forEach((currentNode) => {
        const item = document.getElementById(
          `grid-cell-${currentNode.row}-${currentNode.col}`
        );
        item.innerHTML = '';
        const classId = document.getElementById(
          `grid-cell-${currentNode.row}-${currentNode.col}`
        );
        const words = classId.className.split(' ');
        console.log(words);
        if (
          words.indexOf('node-start') < 0 &&
          words.indexOf('node-finish') < 0 &&
          words.indexOf('node-wall') < 0
        ) {
          classId.className = 'grid-cell grid-background';
        }
      });
    });
  }
};
