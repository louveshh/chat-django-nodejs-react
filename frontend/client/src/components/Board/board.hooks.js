import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setStart,
  setFinish,
  setGrid,
  setSelectedOption,
} from '../../store/slices/board';
import { createInitialGrid } from '../../utils/board/createInitalGrid.utils';
import { clickGrid } from '../../utils/board/clickGrid.utils';
import { configBoard } from '../../config/config';
import { addBorders } from '../../utils/board/common/addBorders.util';

export const useBoard = () => {
  const dispatch = useDispatch();

  const { points, grid, selectedOption, isRunning } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const memoGrid = useMemo(() => cloneDeep(grid), [grid]);
  const memoPoints = useMemo(() => cloneDeep(points), [points]);

  const updateStart = useCallback((payload) => {
    dispatch(setStart(payload));
  }, []);
  const updateFinish = useCallback((payload) => {
    dispatch(setFinish(payload));
  }, []);
  const updateGrid = useCallback((payload) => {
    dispatch(setGrid(payload));
  }, []);

  const updateSelectedOption = useCallback((payload) => {
    dispatch(setSelectedOption(payload));
  }, []);

  useEffect(() => {
    updateGrid(createInitialGrid(memoPoints, activeMode));
    addBorders(grid);
    if (activeMode === 'combo') {
      updateSelectedOption(configBoard.defaultDrawOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode]);

  const handleMouseDown = (row, col) => {
    clickGrid(
      row,
      col,
      selectedOption,
      isRunning,
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
