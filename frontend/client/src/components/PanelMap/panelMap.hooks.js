import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import {
  setPathingInProgress,
  setClearMap,
  setZeroStartCity,
  setAlgorithm,
  setClickPossible,
} from 'store/slices/map';
import { getCanvasContext } from 'utils/map/getCanvasContext.utils';
import { clearMap } from 'utils/map/common/clearMap.utils';
import { drawCities } from 'utils/map/common/drawCities.utils';
import { calculateShortestPath } from 'utils/map/calculateShortestPath.utils';
import { calculateSortedPath } from 'utils/map/calculateSortedPath.utils';
import { drawClickedCity } from 'utils/map/common/drawClickedCity.utils';
import { drawSimplePath } from 'utils/map/common/drawSimplePath.utils';
import { calculateRandomPath } from 'utils/map/calculateRandomPath.utils';
import { mode, map } from 'config/config';

export const usePanelMap = (canvasRef) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    circlePoint,
    randomPoints,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
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
      dispatch(setClearMap(shouldClear));
    },
    [dispatch]
  );
  const updateZeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );

  const updateClickPossible = useCallback(
    (payload) => {
      dispatch(setClickPossible(payload));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    updateZeroStartCity();
    clearMap(canvas, context);
    updateClearState(false);
    updateAlgorithm(null);
    updateClickPossible(false);
  }, [
    canvasRef,
    updateAlgorithm,
    updateClearState,
    updateClickPossible,
    updateZeroStartCity,
  ]);

  const handleTSGClick = () => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      theme,
      canvas,
      context,
      circlePoint,
      randomPoints,
      clickPossible,
      updatePathingInProgress,
      updateClearState
    );
  };

  const handleSortClick = () => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateSortedPath(
      theme,
      randomPoints,
      circlePoint,
      clickPossible,
      canvas,
      context,
      updateClearState,
      updatePathingInProgress
    );
  };

  const handleRandomClick = () => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateRandomPath(
      theme,
      canvas,
      context,
      clickPossible,
      circlePoint,
      randomPoints,
      clearMap,
      updatePathingInProgress,
      drawClickedCity,
      drawCities,
      drawSimplePath,
      updateClearState
    );
  };

  const handleAlgorithm = () => {
    switch (algorithm) {
      case 'tsg':
        return handleTSGClick;
      case 'sort':
        return handleSortClick;
      case 'random':
        return handleRandomClick;
      default:
        break;
    }
  };

  const current = activeMode === mode.map;
  const active = !toClear && !pathingInProgress && current;
  const clickTsg = algorithm === map.tsg && clickPossible;
  const clickSort = algorithm === map.sort && clickPossible;
  const clearing = !pathingInProgress && toClear && current;
  const disabled = !algorithm || pathingInProgress || toClear;

  return {
    pathingInProgress,
    algorithm,
    current,
    active,
    clickTsg,
    clickSort,
    clearing,
    disabled,
    handleAlgorithm,
    handleClear,
  };
};
