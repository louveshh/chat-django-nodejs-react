import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setStartRow,
  setFinishRow,
  setStartCol,
  setFinishCol,
  setGrid,
  setSelectedOption,
} from '../../store/slices/board';
import { createInitialGrid } from '../../utils/board/createInitalGrid.utils';
import { clickGrid } from '../../utils/board/clickGrid.utils';
import { configBoard } from '../../config/config';

export const useBoard = () => {
  const dispatch = useDispatch();
  const { points, grid, selectedOption } = useSelector((state) => state.board);
  const { activeMode } = useSelector((state) => state.toggle);

  const updateStartRow = useCallback(
    (row) => {
      dispatch(setStartRow(row));
    },
    [dispatch]
  );
  const updateFinishRow = useCallback(
    (row) => {
      dispatch(setFinishRow(row));
    },
    [dispatch]
  );
  const updateStartCol = useCallback(
    (col) => {
      dispatch(setStartCol(col));
    },
    [dispatch]
  );
  const updateFinishCol = useCallback(
    (col) => {
      dispatch(setFinishCol(col));
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
        cloneDeep(points),
        updateGrid,
        updateStartRow,
        updateFinishRow,
        updateStartCol,
        updateFinishCol
      );
    },

    [
      grid,
      points,
      selectedOption,
      updateFinishCol,
      updateFinishRow,
      updateGrid,
      updateStartCol,
      updateStartRow,
    ]
  );

  return {
    grid,
    handleMouseDown,
    activeMode,
  };
};
