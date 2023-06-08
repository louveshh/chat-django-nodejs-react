import { useCallback, useEffect } from 'react';
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
import { addBorders } from './../../utils/board/common/addBorders.util';

export const useBoard = () => {
  const dispatch = useDispatch();
  const { points, grid, selectedOption, isRunning } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const updateStart = useCallback(
    (row) => {
      dispatch(setStart(row));
    },
    [dispatch]
  );
  const updateFinish = useCallback(
    (row) => {
      dispatch(setFinish(row));
    },
    [dispatch]
  );

  const updateGrid = useCallback(
    (grid) => {
      dispatch(setGrid(grid));
    },
    [dispatch]
  );

  const resetSelectedOption = useCallback(() => {
    dispatch(setSelectedOption(configBoard.defaultDrawOption));
  });
  useEffect(() => {
    updateGrid(createInitialGrid(cloneDeep(points), activeMode));
    addBorders(grid);
    if (activeMode === 'combo') {
      resetSelectedOption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode]);

  const handleMouseDown = useCallback(
    (row, col) => {
      clickGrid(
        row,
        col,
        cloneDeep(grid),
        selectedOption,
        isRunning,
        cloneDeep(points),
        updateGrid,
        updateStart,
        updateFinish
      );
    },

    [
      grid,
      points,
      selectedOption,
      isRunning,
      updateGrid,
      updateStart,
      updateFinish,
    ]
  );

  return {
    grid,
    handleMouseDown,
  };
};
