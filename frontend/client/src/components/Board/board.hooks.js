import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

import {
  createInitialGrid,
  clearGridUtil,
  updateGridClick,
  runAlgorithm,
  options,
} from "./board.utils";
import {
  setStartRow,
  setFinishRow,
  setStartCol,
  setFinishCol,
  setGrid,
  toggleRunning,
} from "store/slices/board";

export const useBoard = () => {
  const dispatch = useDispatch();

  const { points, grid, isRunning } = useSelector((state) => state.board);
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

  const updateIsRunning = useCallback(
    (isRunning) => {
      dispatch(toggleRunning());
    },
    [dispatch]
  );

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(()=>{
    updateGrid(createInitialGrid(cloneDeep(points), activeMode));
    if (activeMode === 'combo'){
      handleChange(options[0]);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeMode])

  const clearGrid = useCallback(() => {
    clearGridUtil(
      isRunning,
      cloneDeep(grid),
      cloneDeep(points.finishRow),
      cloneDeep(points.finishCol),
      updateGrid
    );
  }, [grid, isRunning, points.finishCol, points.finishRow, updateGrid]);

  const handleMouseDown = useCallback(
    (row, col) => {
      updateGridClick(
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
    grid,
    handleMouseDown,
    clearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    options,
    activeMode
  };
};
