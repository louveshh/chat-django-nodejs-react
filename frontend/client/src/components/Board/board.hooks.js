import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";

import {
  setStartRow,
  setFinishRow,
  setStartCol,
  setFinishCol,
  setGrid,
  toggleRunning,
} from "store/slices/board";
import { createInitialGrid } from "./utils/createInitalGrid.utils";
import { clearGrid } from "./utils/common/clearGrid.utils";
import { clickGrid } from "./utils/clickGrid.utils";
import { runAlgorithm } from "./utils/runAlgorithm.utils";
import { configBoard } from "./../../config/config";

export const useBoard = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    configBoard.defaultDrawOption
  );
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

  const updateIsRunning = useCallback(() => {
    dispatch(toggleRunning());
  }, [dispatch]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    updateGrid(createInitialGrid(cloneDeep(points), activeMode));
    if (activeMode === "combo") {
      handleChange(configBoard.defaultDrawOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMode]);

  const handleClearGrid = useCallback(() => {
    clearGrid(
      isRunning,
      cloneDeep(grid),
      cloneDeep(points.finishRow),
      cloneDeep(points.finishCol),
      updateGrid
    );
  }, [grid, isRunning, points.finishCol, points.finishRow, updateGrid]);

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
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
  };
};
