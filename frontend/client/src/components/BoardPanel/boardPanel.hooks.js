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

  const currentGrid = useMemo(() => cloneDeep(grid), [grid]);
  const currentPoints = useMemo(() => cloneDeep(points), [points]);

  const updateToggleRunning = useCallback(() => {
    dispatch(setToggleRunning());
  }, []);
  const updateSelectedOption = useCallback((payload) => {
    dispatch(setSelectedOption(payload));
  }, []);
  const updateAlgorithm = useCallback((payload) => {
    dispatch(setAlgorithm(payload));
  }, []);

  const handleClearGrid = () => {
    clearGrid(isRunning, currentGrid);
  };

  const handleAlgorithm = () => {
    runAlgorithm(
      algorithm,
      isRunning,
      currentGrid,
      currentPoints,
      updateToggleRunning
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
