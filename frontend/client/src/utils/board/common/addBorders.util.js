import { configDisplay } from 'config/config';

export const addBorders = () => {
  const addLastClass = (string) => {
    const words = string.split(' ');
    const index = words.indexOf('grid-background');
    if (index > -1) {
      return string;
    }
    return `${string} grid-background`;
  };
  for (let i = 0; i < configDisplay.DISPLAY_SIZE; i++) {
    for (let k = 0; k < configDisplay.DISPLAY_SIZE; k++) {
      const classId = document.getElementById(`grid-cell-${i}-${k}`);
      if (classId) {
        classId.className = addLastClass(classId.className);
      }
    }
  }
};
