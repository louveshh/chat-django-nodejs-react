import { node } from 'config/config';

export const useNode = (isFinish, isStart, isWall) => {
  const extraClassName = isFinish
    ? node.finish
    : isStart
    ? node.start
    : isWall
    ? node.wall
    : '';
  const extraNodeBorder = node.border;
  const baseClassName = node.base;
  return { baseClassName, extraClassName, extraNodeBorder };
};
