import { configDisplay, node } from 'config/config';

export const removeBorders = () => {
  const removeLastClass = (string) => {
    const words = string.split(' ');
    const index = words.indexOf(node.border);
    if (index > -1) {
      words.splice(index, 1);
      return words.join(' ');
    }
    return string;
  };
  for (let i = 0; i < configDisplay.DISPLAY_SIZE; i++) {
    for (let k = 0; k < configDisplay.DISPLAY_SIZE; k++) {
      const classId = document.getElementById(`node-base-${i}-${k}`);
      if (classId) {
        classId.className = removeLastClass(classId.className);
      }
    }
  }
};
