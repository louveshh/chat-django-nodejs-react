import { configDisplay } from 'config/config';

export const coordinatesToBlockNumbers = (input) => {
  const blockSize = configDisplay.NODE_SIZE();
  return Math.floor(input / blockSize);
};
