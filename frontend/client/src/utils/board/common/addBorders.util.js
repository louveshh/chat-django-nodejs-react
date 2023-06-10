import { configDisplay, node } from 'config/config';

export const addBorders = () => {
  const addLastClass = (string) => {
    const words = string.split(' ');
    const index = words.indexOf(node.border);
    if (index > -1) {
      return string;
    }
    return `${string} node-border`;
  };
  for (let i = 0; i < configDisplay.DISPLAY_SIZE; i++) {
    for (let k = 0; k < configDisplay.DISPLAY_SIZE; k++) {
      const classId = document.getElementById(`node-base-${i}-${k}`);
      if (classId) {
        classId.className = addLastClass(classId.className);
      }
    }
  }
};
