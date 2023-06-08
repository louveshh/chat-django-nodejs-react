import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setToggleRunning,
  setSelectedOption,
  setAlgorithm,
} from '../../store/slices/board';
import { clearGrid } from '../../utils/board/common/clearGrid.utils';
import { runAlgorithm } from '../../utils/board/runAlgorithm.utils';

export const useBoardPanel = () => {
  const dispatch = useDispatch();

  const { points, grid, isRunning, selectedOption, algorithm } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const memoGrid = useMemo(() => cloneDeep(grid), [grid]);
  const memoPoints = useMemo(() => cloneDeep(points), [points]);

  const updateToggleRunning = useCallback(() => {
    dispatch(setToggleRunning());
  }, []);
  const updateSelectedOption = useCallback((payload) => {
    dispatch(setSelectedOption(payload));
  }, []);
  const updateAlgorithm = useCallback((payload) => {
    dispatch(setAlgorithm(payload));
  }, []);

  const handleClearGrid = useCallback(() => {
    clearGrid(isRunning, memoGrid);
  }, [grid, isRunning, points.finishCol, points.finishRow]);

  const handleAlgorithm = () => {
    runAlgorithm(
      algorithm,
      isRunning,
      updateToggleRunning,
      memoGrid,
      memoPoints
    );
    updateAlgorithm('');
  };
  return {
    isRunning,
    selectedOption,
    activeMode,
    algorithm,
    handleClearGrid,
    handleAlgorithm,
    updateSelectedOption,
  };
};
