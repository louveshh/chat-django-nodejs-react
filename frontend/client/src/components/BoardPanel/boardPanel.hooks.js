import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setGrid,
  toggleRunning,
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

  const handleAlgorithm = useCallback(() => {
    runAlgorithm(
      algorithm,
      isRunning,
      updateIsRunning,
      cloneDeep(grid),
      cloneDeep(points)
    );
    dispatch(setAlgorithm(''));
  }, [grid, isRunning, points, updateIsRunning, algorithm]);
  return {
    isRunning,
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
    algorithm,
  };
};
