export const addBorders = (grid) => {
  const addLastClass = (string) => {
    const words = string.split(' ');
    const index = words.indexOf('grid-background');
    if (index > -1) {
      return string;
    }
    return `${string} grid-background`;
  };
  const updatedGrid = grid.slice();
  updatedGrid.forEach((row) => {
    row.forEach((currentNode) => {
      const classId = document.getElementById(
        `grid-cell-${currentNode.row}-${currentNode.col}`
      );
      if (classId) {
        classId.className = addLastClass(classId.className);
      }
    });
  });
};
