import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setPathingInProgress,
  setClear,
  setZeroStartCity,
} from 'store/slices/map';
import { getCanvasContext } from '../../utils/map/getCanvasContext.utils';
import { clearMap } from '../../utils/map/common/clearMap.utils';
import { drawCities } from '../../utils/map/common/drawCities.utils';
import { finishDrawing } from '../../utils/map/common/finishDrawing.utils';
import { calculateShortestPath } from '../../utils/map/calculateShortestPath.utils';
import { calculateSortedPath } from '../../utils/map/calculateSortedPath.utils';
import { drawClickedCity } from '../../utils/map/common/drawClickedCity.utils';
import { drawSimplePath } from '../../utils/map/drawSimplePath.utils';
import { calculateDatePath } from '../../utils/map/calculateDatePath.utils';
import { calculateRandomPath } from '../../utils/map/calculateRandomPath.utils';

export const useMapPanel = (canvasRef) => {
  const dispatch = useDispatch();

  const {
    circlePoint,
    randomPoints,
    pathingInProgress,
    toClear,
    clickPossible,
  } = useSelector((state) => state.map);
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
  const zeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    zeroStartCity();
    clearMap(canvas, context);
    updateClearState(false);
  }, [updateClearState, zeroStartCity]);

  const handleTSGClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      canvas,
      context,
      circlePoint,
      randomPoints,
      clickPossible,
      updatePathingInProgress,
      updateClearState
    );
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgress,
  ]);

  const handleSortClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateSortedPath(
      randomPoints,
      circlePoint,
      clickPossible,
      canvas,
      context,
      updateClearState,
      updatePathingInProgress
    );
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgress,
  ]);

  const handleDateClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateDatePath(
      canvas,
      context,
      clickPossible,
      circlePoint,
      randomPoints,
      updatePathingInProgress,
      clearMap,
      drawClickedCity,
      drawCities,
      drawSimplePath,
      finishDrawing,
      updateClearState
    );
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgress,
  ]);

  const handleRandomClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateRandomPath(
      canvas,
      context,
      clickPossible,
      circlePoint,
      randomPoints,
      updatePathingInProgress,
      clearMap,
      drawClickedCity,
      drawCities,
      drawSimplePath,
      finishDrawing,
      updateClearState
    );
  }, [
    toClear,
    pathingInProgress,
    clickPossible,
    circlePoint,
    randomPoints,
    updatePathingInProgress,
    updateClearState,
  ]);

  return {
    toClear,
    pathingInProgress,
    activeMode,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
  };
};
