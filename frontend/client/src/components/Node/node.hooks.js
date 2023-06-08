import { useSelector } from 'react-redux';

export const useNode = (isFinish, isStart, isWall) => {
  const { activeMode } = useSelector((state) => state.toggle);
  const { pathingInProgress } = useSelector((state) => state.map);
  const { toClear } = useSelector((state) => state.board);
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';
  const extraNodeBorder = 'grid-background';
  return { extraClassName, extraNodeBorder };
};
