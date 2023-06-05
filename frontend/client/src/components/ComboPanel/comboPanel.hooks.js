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
import {
  setStartRow,
  setFinishRow,
  setStartCol,
  setFinishCol,
  setStep,
} from '../../store/slices/board';
import { toggleRunning } from '../../store/slices/board';
import { getCanvasContext } from '../../utils/map/getCanvasContext.utils';
import { clearMap } from '../../utils/map/common/clearMap.utils';
import { calculateShortestPath } from '../../utils/map/calculateShortestPath.utils';
import { runAlgorithm } from '../../utils/board/runAlgorithm.utils';

export const useComboPanel = (canvasRef) => {
  const dispatch = useDispatch();

  const updateIsRunning = useCallback(() => {
    dispatch(toggleRunning());
  }, [dispatch]);
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

  const {
    circlePoint,
    filteredCities,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
  } = useSelector((state) => state.map);
  const { points, grid, isRunning, step } = useSelector((state) => state.board);
  const { activeMode } = useSelector((state) => state.toggle);

  const updatePathingInProgress = useCallback(
    (inProgress) => {
      dispatch(setPathingInProgress(inProgress));
    },
    [dispatch]
  );

  const updateClearState = useCallback(
    (shouldClear) => {
      dispatch(setClear(shouldClear));
    },
    [dispatch]
  );
  const updateStep = useCallback(
    (step) => {
      dispatch(setStep(step));
    },
    [dispatch]
  );
  const zeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

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
        // Do something with the shortestPath array
        console.log(shortestPath);
        const outputArray = shortestPath.reduce((result, obj, index) => {
          if (index < shortestPath.length - 1) {
            result.push([obj, shortestPath[index + 1]]);
          }
          return result;
        }, []);
        return outputArray;
      })
      .then((outputArray) => {
        console.log(outputArray);
        const algorithm = 'dijkstra';
        let newStep;
        async function iterateArray(index, newStep) {
          if (index >= outputArray.length) {
            // Base case: end of array reached, stop recursion
            return;
          }

          const item = outputArray[index];
          console.log(item, 'xddddddddddd');

          const newPoints = {
            startRow: coordinatesToBlockNumbers(item[0].y),
            finishRow: coordinatesToBlockNumbers(item[1].y),
            startCol: coordinatesToBlockNumbers(item[0].x),
            finishCol: coordinatesToBlockNumbers(item[1].x),
          };
          console.log('newPoints', newStep);
          let newStepAlg = runAlgorithm(
            algorithm,
            isRunning,
            updateIsRunning,
            cloneDeep(grid),
            newPoints,
            'combo',
            newStep
          );

          // Wait for the algorithm to finish before proceeding
          await new Promise((resolve) => {
            setTimeout(resolve, 5000); // Adjust the delay as needed
          });

          // Recursive call to iterateArray with the next index
          iterateArray(index + 1, newStepAlg);
        }

        // Start the iteration from the beginning
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

  const handleAlgorithm = () => {
    return handleTSGClick;
  };

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
