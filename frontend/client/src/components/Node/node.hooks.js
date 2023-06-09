export const useNode = (isFinish, isStart, isWall) => {
  const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
  const extraNodeBorder = 'grid-background';
  return { extraClassName, extraNodeBorder };
};
