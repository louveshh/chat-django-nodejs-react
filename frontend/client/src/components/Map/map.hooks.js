import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { setCirclePoint, setRandomPoints } from 'store/slices/map';
import { tempRandom } from 'utils/map/tempRandom.utils';
import { getCanvasContext } from 'utils/map/getCanvasContext.utils';
import { clearMap } from 'utils/map/common/clearMap.utils';
import { drawCities } from 'utils/map/common/drawCities.utils';
import { selectClickCity } from 'utils/map/selectClickCity.utils';
import { drawClickedCity } from 'utils/map/common/drawClickedCity.utils';
import { configDisplay, configMap, mode, map } from 'config/config';

export const useMap = (canvasRef) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    circlePoint,
    randomPoints,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
    filteredCities,
  } = useSelector((state) => state.map);
  const { activeMode, theme: themeName } = useSelector((state) => state.toggle);

  const updateCirclePoint = (newPoint) => {
    dispatch(setCirclePoint(newPoint));
  };

  const updateRandomPoints = useCallback(
    (payload) => {
      dispatch(setRandomPoints(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    tempRandom(updateRandomPoints);
    return () => {};
  }, [updateRandomPoints]);

  // base setup
  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    if (activeMode === mode.map) {
      const { canvas, context } = getCanvasContext(canvasRef);
      clearMap(canvas, context);
      context.lineJoin = configMap.context.lineJoin;
      context.lineCap = configMap.context.lineCap;
      context.lineWidth = configMap.context.lineWidth;
      context.imageSmoothingEnabled = configMap.context.imageSmoothingEnabled;
      if (clickPossible && algorithm === map.sort) {
        drawClickedCity(theme, context, circlePoint, true);
      }
      if (clickPossible && algorithm !== map.sort) {
        drawClickedCity(theme, context, circlePoint, false);
      }
      if (algorithm === map.sort) {
        drawCities(theme, context, randomPoints, true);
      } else {
        drawCities(theme, context, randomPoints, false);
      }
    }
    return () => {};
  }, [
    activeMode,
    algorithm,
    canvasRef,
    circlePoint,
    clickPossible,
    pathingInProgress,
    randomPoints,
    theme,
    toClear,
  ]);

  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    if (activeMode !== mode.map) {
      const { canvas, context } = getCanvasContext(canvasRef);
      context.lineJoin = configMap.context.lineJoin;
      context.lineCap = configMap.context.lineCap;
      context.lineWidth = configMap.context.lineWidth;
      context.imageSmoothingEnabled = configMap.context.imageSmoothingEnabled;
      clearMap(canvas, context);
      const filteredCitiesMapped = filteredCities.map((item) => ({
        x: item.value.x,
        y: item.value.y,
        selectedStart: item.value.selectedStart,
      }));
      if (configMap.clickPossibleTargets.includes(activeMode)) {
        drawClickedCity(theme, context, circlePoint, false);
      }
      drawCities(theme, context, filteredCitiesMapped, false);
    }
    return () => {};
  }, [
    activeMode,
    canvasRef,
    circlePoint,
    filteredCities,
    pathingInProgress,
    theme,
    toClear,
  ]);

  const handleCanvasClick = (event) => {
    if (
      !clickPossible &&
      !configMap.clickPossibleTargets.includes(activeMode)
    ) {
      return;
    }
    selectClickCity(canvasRef, event, updateCirclePoint, circlePoint);
  };
  const handleMouseMove = (event) => {
    if (!configMap.mouseMoveCities.includes(activeMode)) {
      return;
    }
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    let mouseX;
    let mouseY;
    if (
      rect?.height > configDisplay.RESCALED_VALUE() &&
      rect.width > configDisplay.RESCALED_VALUE()
    ) {
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    } else {
      mouseX = (event.clientX - rect.left) * configDisplay.SCALED_CLICK();
      mouseY = (event.clientY - rect.top) * configDisplay.SCALED_CLICK();
    }
    const selectedSize = 5;

    const selectedCoordinate = randomPoints.find(({ x, y }) => {
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      return distance <= selectedSize;
    });

    if (selectedCoordinate) {
      // console.log('Object detected:', selectedCoordinate);
    }
  };

  return {
    canvasRef,
    activeMode,
    themeName,
    handleCanvasClick,
    handleMouseMove,
  };
};
