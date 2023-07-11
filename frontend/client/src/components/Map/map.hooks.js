import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { setOwnSelectedCity, setMouseMoveCity } from 'store/slices/map/map';
import { getCanvasContext } from 'utils/map/getCanvasContext.utils';
import { clearMap } from 'utils/map/common/clearMap.utils';
import { drawCities } from 'utils/map/common/drawCities.utils';
import { selectClickCity } from 'utils/map/selectClickCity.utils';
import { drawClickedCity } from 'utils/map/common/drawClickedCity.utils';
import { configMap, mode, map } from 'config/config';
import { isCityFarEnough } from 'utils/map/common/isCityFarEnough';
import { isInsideMap } from 'utils/map/common/isInsideMap';

export const useMap = (canvasRef) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const {
    ownSelectedCity,
    cityPoints,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
    filteredCities,
    mouseMoveCity,
  } = useSelector((state) => state.map);
  const { activeMode, theme: themeName } = useSelector((state) => state.toggle);

  const updateOwnSelectedCity = (newPoint) => {
    dispatch(setOwnSelectedCity(newPoint));
  };

  const updateMouseMoveCity = useCallback(
    (payload) => {
      dispatch(setMouseMoveCity(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    const { context } = getCanvasContext(canvasRef);
    context.lineJoin = configMap.context.lineJoin;
    context.lineCap = configMap.context.lineCap;
    context.lineWidth = configMap.context.lineWidth;
    context.imageSmoothingEnabled = configMap.context.imageSmoothingEnabled;
  }, [canvasRef]);

  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    if (activeMode === mode.map) {
      const { canvas, context } = getCanvasContext(canvasRef);
      clearMap(canvas, context);
      if (clickPossible && algorithm === map.sort) {
        drawClickedCity(theme, context, ownSelectedCity, true);
      }
      if (clickPossible && algorithm !== map.sort) {
        drawClickedCity(theme, context, ownSelectedCity, false);
      }
      if (algorithm === map.sort) {
        drawCities(theme, context, cityPoints, true);
      } else {
        drawCities(theme, context, cityPoints, false);
      }
    }
    return () => {};
  }, [
    activeMode,
    algorithm,
    canvasRef,
    ownSelectedCity,
    clickPossible,
    pathingInProgress,
    cityPoints,
    theme,
    toClear,
  ]);

  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    if (activeMode === mode.combo) {
      const { canvas, context } = getCanvasContext(canvasRef);
      clearMap(canvas, context);
      const filteredCitiesMapped = filteredCities.map((item) => ({
        x: item.value.x,
        y: item.value.y,
        selectedStart: item.value.selectedStart,
      }));
      if (configMap.clickPossibleTargets.includes(activeMode)) {
        drawClickedCity(theme, context, ownSelectedCity, false);
      }
      drawCities(theme, context, filteredCitiesMapped, false);
    }
    return () => {};
  }, [
    cityPoints,
    activeMode,
    canvasRef,
    ownSelectedCity,
    filteredCities,
    pathingInProgress,
    theme,
    toClear,
  ]);

  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    if (activeMode === mode.add) {
      const { canvas, context } = getCanvasContext(canvasRef);
      clearMap(canvas, context);
      drawClickedCity(theme, context, ownSelectedCity, true);
      drawCities(theme, context, cityPoints, false, true);
    }
    return () => {};
  }, [
    activeMode,
    canvasRef,
    ownSelectedCity,
    filteredCities,
    pathingInProgress,
    cityPoints,
    theme,
    toClear,
  ]);

  const handleCanvasClick = (event) => {
    if (
      !(clickPossible && activeMode === mode.map) &&
      activeMode !== mode.add
    ) {
      return;
    }
    selectClickCity(
      canvasRef,
      event,
      updateOwnSelectedCity,
      ownSelectedCity,
      cityPoints
    );
  };
  const handleMouseMove = (event) => {
    if (activeMode !== mode.add) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const { x, y } = isInsideMap(event, rect);
    const farEnoughtNewCity = isCityFarEnough(cityPoints, x, y, 50);

    if (!farEnoughtNewCity) {
      return;
    }

    if (farEnoughtNewCity !== mouseMoveCity) {
      updateMouseMoveCity(farEnoughtNewCity);
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
