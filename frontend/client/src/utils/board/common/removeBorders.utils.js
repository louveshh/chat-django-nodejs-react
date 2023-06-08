export const removeBorders = (grid) => {
  const removeLastClass = (string) => {
    const words = string.split(' ');
    const index = words.indexOf('grid-background');
    if (index > -1) {
      words.splice(index, 1);
      return words.join(' ');
    }
    return string;
  };
  const updatedGrid = grid.slice();
  updatedGrid.forEach((row) => {
    row.forEach((currentNode) => {
      const classId = document.getElementById(
        `grid-cell-${currentNode.row}-${currentNode.col}`
      );
      if (classId) {
        classId.className = removeLastClass(classId.className);
      }
    });
  });
};
