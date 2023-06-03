import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setGrid,
  toggleRunning,
  setSelectedOption,
} from '../../store/slices/board';
import { clearGrid } from '../../utils/board/common/clearGrid.utils';
import { runAlgorithm } from '../../utils/board/runAlgorithm.utils';

export const useBoardPanel = () => {
  const dispatch = useDispatch();
  const { points, grid, isRunning, selectedOption } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const updateGrid = useCallback(
    (grid) => {
      dispatch(setGrid(grid));
    },
    [dispatch]
  );

  const updateIsRunning = useCallback(() => {
    dispatch(toggleRunning());
  }, [dispatch]);

  const updateSelectedOption = useCallback((selectedOption) => {
    dispatch(setSelectedOption(selectedOption));
  });

  const handleChange = (option) => {
    updateSelectedOption(option);
  };

  const handleClearGrid = useCallback(() => {
    clearGrid(
      isRunning,
      cloneDeep(grid),
      cloneDeep(points.finishRow),
      cloneDeep(points.finishCol),
      updateGrid
    );
  }, [grid, isRunning, points.finishCol, points.finishRow, updateGrid]);

  const handleAlgorithm = useCallback(
    (algorithm) => {
      runAlgorithm(
        algorithm,
        isRunning,
        updateIsRunning,
        cloneDeep(grid),
        cloneDeep(points)
      );
    },
    [grid, isRunning, points, updateIsRunning]
  );
  return {
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
  };
};
