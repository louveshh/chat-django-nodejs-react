import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

import {
  setPathingInProgress,
  setClear,
  setZeroStartCity,
  setAlgorithm,
  setClickPossible,
} from 'store/slices/map';

import { toggleRunning, setGrid } from '../../store/slices/board';
import { getCanvasContext } from '../../utils/map/getCanvasContext.utils';
import { clearMap } from '../../utils/map/common/clearMap.utils';
import { calculateShortestPath } from '../../utils/map/calculateShortestPath.utils';
import { runAlgorithm } from '../../utils/board/runAlgorithm.utils';
import { removeBorders } from '../../utils/board/common/removeBorders.utils';

export const useComboPanel = (canvasRef) => {
  const dispatch = useDispatch();

  const {
    circlePoint,
    filteredCities,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
  } = useSelector((state) => state.map);
  const { grid, isRunning, points } = useSelector((state) => state.board);
  const { activeMode } = useSelector((state) => state.toggle);

  const updatePathingInProgress = useCallback(
    (inProgress) => {
      dispatch(setPathingInProgress(inProgress));
    },
    [dispatch]
  );
  const updateIsRunning = useCallback(() => {
    dispatch(toggleRunning());
  }, [dispatch]);

  const updateClearState = useCallback(
    (shouldClear) => {
      dispatch(setClear(shouldClear));
    },
    [dispatch]
  );
  const zeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const updateGrid = useCallback(
    (grid) => {
      dispatch(setGrid(grid));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    zeroStartCity();
    clearMap(canvas, context);
    updateClearState(false);
    dispatch(setAlgorithm(null));
    dispatch(setClickPossible(false));
  }, [updateClearState, zeroStartCity]);

  const handleTSGClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    const mappedPoints = filteredCities.map(({ value }) => ({
      x: value.x,
      y: value.y,
      selectedStart: value.selectedStart,
    }));

    const coordinatesToBlockNumbers = (input) => {
      const blockSize = 16;
      return Math.floor(input / blockSize);
    };
    const shortestPathPromise = calculateShortestPath(
      canvas,
      context,
      circlePoint,
      mappedPoints,
      clickPossible,
      updatePathingInProgress,
      updateClearState
    );
    shortestPathPromise
      .then((shortestPath) => {
        removeBorders(grid);
        const outputArray = shortestPath.reduce((result, obj, index) => {
          if (index < shortestPath.length - 1) {
            result.push([obj, shortestPath[index + 1]]);
          }
          return result;
        }, []);
        return outputArray;
      })
      .then((outputArray) => {
        const algorithm = 'dijkstra';
        async function iterateArray(index, newStep) {
          if (index >= outputArray.length) {
            return;
          }

          const item = outputArray[index];

          const newPoints = {
            startRow: coordinatesToBlockNumbers(item[0].y),
            finishRow: coordinatesToBlockNumbers(item[1].y),
            startCol: coordinatesToBlockNumbers(item[0].x),
            finishCol: coordinatesToBlockNumbers(item[1].x),
          };
          const newStepAlg = runAlgorithm(
            algorithm,
            isRunning,
            updateIsRunning,
            cloneDeep(grid),
            newPoints,
            'combo',
            newStep
          );

          await new Promise((resolve) => {
            setTimeout(resolve, 200);
          });

          iterateArray(index + 1, newStepAlg);
        }

        iterateArray(0, 0);
      });
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    filteredCities,
    clickPossible,
    updateClearState,
    updatePathingInProgress,
  ]);

  const handleAlgorithm = () => handleTSGClick;

  return {
    toClear,
    pathingInProgress,
    activeMode,
    algorithm,
    clickPossible,
    handleAlgorithm,
    handleClear,
  };
};
