import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import { setToggleRunning, setAlgorithm, setClearBoard } from 'store/slices/board';
import { clearGrid } from 'utils/board/common/clearGrid.utils';
import { runAlgorithm } from 'utils/board/runAlgorithm.utils';
import { mode } from 'config/config';

export const usePanelBoard = () => {
  const dispatch = useDispatch();

  const { points, grid, pathingInProgress, algorithm, toClear } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const currentGrid = useMemo(() => cloneDeep(grid), [grid]);
  const currentPoints = useMemo(() => cloneDeep(points), [points]);

  const updateToggleRunning = useCallback(() => {
    dispatch(setToggleRunning());
  }, [dispatch]);

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );
  const updateClear = useCallback(
    (payload) => {
      dispatch(setClearBoard(payload));
    },
    [dispatch]
  );

  const handleClearGrid = () => {
    updateClear(false);
    clearGrid(pathingInProgress, currentGrid);
  };

  const handleAlgorithm = () => {
    updateClear(true);
    runAlgorithm(algorithm, pathingInProgress, currentGrid, currentPoints, updateToggleRunning);
    updateAlgorithm('');
  };

  const board = activeMode === mode.board;
  const clear = !pathingInProgress && toClear && board;
  const active = !toClear && !pathingInProgress && board;
  const disabled = !algorithm || pathingInProgress || toClear;
  return {
    pathingInProgress,
    clear,
    active,
    board,
    disabled,
    handleClearGrid,
    handleAlgorithm,
  };
};
