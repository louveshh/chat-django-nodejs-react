import { node } from '../../../config/config';

export const clearGrid = (pathingInProgress, grid) => {
  if (!pathingInProgress) {
    const updatedGrid = grid.slice();
    updatedGrid.forEach((row) => {
      row.forEach((currentNode) => {
        const item = document.getElementById(`node-base-${currentNode.row}-${currentNode.col}`);
        item.innerHTML = '';
        const classId = document.getElementById(`node-base-${currentNode.row}-${currentNode.col}`);
        const words = classId.className.split(' ');
        if (words.indexOf(node.start) < 0 && words.indexOf(node.finish) < 0 && words.indexOf(node.wall) < 0) {
          classId.className = 'node-base node-border';
        }
      });
    });
  }
};
