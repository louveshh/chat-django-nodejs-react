import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import { setStart, setFinish, setGrid } from 'store/slices/board/board';
import { createInitialGrid } from 'utils/board/createInitalGrid.utils';
import { clickGrid } from 'utils/board/clickGrid.utils';

export const useBoard = () => {
  const dispatch = useDispatch();

  const { points, grid, selectedOption, pathingInProgress } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const memoGrid = useMemo(() => cloneDeep(grid), [grid]);
  const memoPoints = useMemo(() => cloneDeep(points), [points]);

  const updateStart = useCallback(
    (payload) => {
      dispatch(setStart(payload));
    },
    [dispatch]
  );
  const updateFinish = useCallback(
    (payload) => {
      dispatch(setFinish(payload));
    },
    [dispatch]
  );
  const updateGrid = useCallback(
    (payload) => {
      dispatch(setGrid(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    updateGrid(createInitialGrid(memoPoints, activeMode));
    return () => {};
    // do not want to update the grid when memoPoints are changed
    // excluded memoPoints from dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode, updateGrid]);

  const handleMouseDown = (row, col) => {
    clickGrid(
      row,
      col,
      selectedOption,
      pathingInProgress,
      memoGrid,
      memoPoints,
      updateStart,
      updateFinish,
      updateGrid
    );
  };

  return {
    grid,
    handleMouseDown,
  };
};
