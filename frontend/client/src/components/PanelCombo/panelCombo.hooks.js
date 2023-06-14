import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { useTheme } from 'styled-components';

import {
  setPathingInProgress,
  setClearMap,
  setZeroStartCity,
  setAlgorithm,
  setClickPossible,
} from 'store/slices/map';
import { setToggleRunning, setClearBoard } from 'store/slices/board';
import { clearGrid } from 'utils/board/common/clearGrid.utils';
import { getCanvasContext } from 'utils/map/getCanvasContext.utils';
import { clearMap } from 'utils/map/common/clearMap.utils';
import { calculateShortestPath } from 'utils/map/calculateShortestPath.utils';
import { runAlgorithm } from 'utils/board/runAlgorithm.utils';
import { removeBorders } from 'utils/board/common/removeBorders.utils';
import { coordinatesToBlockNumbers } from 'utils/combo/coordinatesToBlockNumbers.utils';
import { dividePoints } from 'utils/combo/dividePoints.utils';
import { board, mode } from 'config/config';

export const usePanelCombo = (canvasRef) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    pathingInProgress: mapPathingInProgress,
    toClear: mapToClear,
    circlePoint,
    filteredCities,
    clickPossible,
  } = useSelector((state) => state.map);
  const {
    toClear: boardToClear,
    pathingInProgress: boardPathingInProgress,
    grid,
  } = useSelector((state) => state.board);
  const { activeMode } = useSelector((state) => state.toggle);

  const currentGrid = useMemo(() => cloneDeep(grid), [grid]);

  const mappedPoints = useMemo(
    () =>
      filteredCities.map(({ value }) => ({
        x: value.x,
        y: value.y,
        selectedStart: value.selectedStart,
      })),
    [filteredCities]
  );

  const updatePathingInProgress = useCallback(
    (payload) => {
      dispatch(setPathingInProgress(payload));
    },
    [dispatch]
  );
  const updateClearMap = useCallback(
    (payload) => {
      dispatch(setClearMap(payload));
    },
    [dispatch]
  );

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );

  const updateZeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const updateClickPossible = useCallback(() => {
    dispatch(setClickPossible());
  }, [dispatch]);

  const updateToggleRunning = useCallback(() => {
    dispatch(setToggleRunning());
  }, [dispatch]);

  const updateClearBoard = useCallback(
    (payload) => {
      dispatch(setClearBoard(payload));
    },
    [dispatch]
  );

  const handleClearMap = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    updateZeroStartCity();
    clearMap(canvas, context);
    updateClearMap(false);
    updateAlgorithm(null);
    updateClickPossible(false);
  }, [
    canvasRef,
    updateAlgorithm,
    updateClearMap,
    updateClickPossible,
    updateZeroStartCity,
  ]);

  const handleClearBoard = (payload) => {
    updateClearBoard(payload);
    clearGrid(boardPathingInProgress, currentGrid);
  };

  const iterateArrayAsync = async (outputArray, index, newStep) => {
    if (index >= outputArray.length) {
      updateToggleRunning();
      return;
    }
    const algorithm = board.dijkstra;

    const item = outputArray[index];

    const currentPoints = {
      startRow: coordinatesToBlockNumbers(item[0].y),
      finishRow: coordinatesToBlockNumbers(item[1].y),
      startCol: coordinatesToBlockNumbers(item[0].x),
      finishCol: coordinatesToBlockNumbers(item[1].x),
    };
    const currentGrid = cloneDeep(grid);
    let newStepAlg = newStep;
    newStepAlg += runAlgorithm(
      algorithm,
      mapPathingInProgress,
      currentGrid,
      currentPoints,
      () => {},
      mode.combo,
      newStep
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    iterateArrayAsync(outputArray, index + 1, newStepAlg - 1);
  };

  const handleAlgorithm = () => {
    if (
      mapToClear ||
      mapPathingInProgress ||
      boardToClear ||
      boardPathingInProgress
    ) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);

    const shortestPathPromise = calculateShortestPath(
      theme,
      canvas,
      context,
      circlePoint,
      mappedPoints,
      clickPossible,
      updatePathingInProgress,
      updateClearMap
    );
    updateToggleRunning();
    handleClearBoard(true);
    updatePathingInProgress(true);
    updateClearMap(true);
    shortestPathPromise
      .then((shortestPath) => {
        removeBorders();
        const dividedPoints = dividePoints(shortestPath);
        return dividedPoints;
      })
      .then((outputArray) => {
        iterateArrayAsync(outputArray, 0, 0);
      })
      .then(() => {
        updateZeroStartCity();
      });
  };

  const clearingMap =
    !boardPathingInProgress &&
    !mapPathingInProgress &&
    mapToClear &&
    activeMode === mode.combo;
  const clearingBoard =
    !boardPathingInProgress &&
    !mapPathingInProgress &&
    boardToClear &&
    activeMode === mode.combo;
  const active = !(
    mapPathingInProgress ||
    mapToClear ||
    boardToClear ||
    boardPathingInProgress
  );
  const disabled = filteredCities.length < 2 || mapToClear || boardToClear;
  const pathingInProgress = mapPathingInProgress || boardPathingInProgress;
  return {
    clearingMap,
    clearingBoard,
    active,
    disabled,
    pathingInProgress,
    handleAlgorithm,
    handleClearMap,
    handleClearBoard,
  };
};
