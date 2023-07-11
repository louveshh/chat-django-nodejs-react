import { configDisplay, node } from 'config/config';

export const addBorders = () => {
  const addLastClass = (element) => {
    const words = element.split(' ');
    const index = words.indexOf(node.border);
    if (index > -1) {
      return element;
    }
    return `${element} ${node.border}`;
  };
  for (let i = 0; i < configDisplay.DISPLAY_SIZE; i++) {
    for (let k = 0; k < configDisplay.DISPLAY_SIZE; k++) {
      const classId = document.getElementById(`${node.base}-${i}-${k}`);
      if (classId) {
        classId.className = addLastClass(classId.className);
      }
    }
  }
};
