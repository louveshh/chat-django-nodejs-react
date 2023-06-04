import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCirclePoint, setRandomPoints, setClear } from 'store/slices/map';
import { tempRandom } from '../../utils/map/tempRandom.utils';
import { getCanvasContext } from '../../utils/map/getCanvasContext.utils';
import { clearMap } from '../../utils/map/common/clearMap.utils';
import { drawCities } from '../../utils/map/common/drawCities.utils';
import { finishDrawing } from '../../utils/map/common/finishDrawing.utils';
import { selectClickCity } from '../../utils/map/selectClickCity.utils';
import { drawClickedCity } from '../../utils/map/common/drawClickedCity.utils';
import { configMap } from '../../config/config';

export const useMap = (canvasRef) => {
  const dispatch = useDispatch();

  const {
    circlePoint,
    randomPoints,
    pathingInProgress,
    toClear,
    clickPossible,
    algorithm,
  } = useSelector((state) => state.map);
  const { activeMode, theme } = useSelector((state) => state.toggle);

  const updateCirclePoint = (newPoint) => {
    dispatch(setCirclePoint(newPoint));
  };

  const updateRandomPoints = useCallback(
    (newPoints) => {
      dispatch(setRandomPoints(newPoints));
    },
    [dispatch]
  );

  const updateClearState = useCallback(
    (shouldClear) => {
      dispatch(setClear(shouldClear));
    },
    [dispatch]
  );

  useEffect(() => {
    tempRandom(updateRandomPoints);
  }, [updateRandomPoints]);

  // base setup
  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    context.lineJoin = configMap.context.lineJoin;
    context.lineCap = configMap.context.lineCap;
    context.lineWidth = configMap.context.lineWidth;
    context.imageSmoothingEnabled = configMap.context.imageSmoothingEnabled;
    clearMap(canvas, context);
    updateClearState(false);
    if (clickPossible && configMap.clickPossibleTargets.includes(activeMode)) {
      drawClickedCity(context, circlePoint);
    }
    if (algorithm === 'sort') {
      drawCities(context, randomPoints, true);
    } else {
      drawCities(context, randomPoints, false);
    }
    finishDrawing(context);
  }, [
    circlePoint,
    randomPoints,
    toClear,
    pathingInProgress,
    activeMode,
    clickPossible,
    algorithm,
    updateClearState,
  ]);

  const handleCanvasClick = (event) => {
    if (!clickPossible && configMap.clickPossibleTargets.includes(activeMode)) {
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
    if (rect?.height > 321 && rect.width > 321) {
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    } else {
      mouseX = (event.clientX - rect.left) * 2;
      mouseY = (event.clientY - rect.top) * 2;
    }
    const selectedSize = 5;

    const selectedCoordinate = randomPoints.find(({ x, y }) => {
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      return distance <= selectedSize;
    });

    if (selectedCoordinate) {
      // eslint-disable-next-line no-console
      console.log('Object detected:', selectedCoordinate);
    }
  };

  return {
    canvasRef,
    activeMode,
    theme,
    handleCanvasClick,
    handleMouseMove,
  };
};
