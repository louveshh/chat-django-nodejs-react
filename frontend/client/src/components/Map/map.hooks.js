import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClear,
} from "store/slices/map";
import { tempRandom } from './utils/tempRandom.utils';
import { getCanvasContext } from './utils/getCanvasContext.utils';
import { clearMap } from './utils/common/clearMap.utils';
import { drawCities } from './utils/common/drawCities.utils';
import { finishDrawing } from './utils/common/finishDrawing.utils';
import { selectClickCity } from './utils/selectClickCity.utils';
import { calculateShortestPath } from './utils/calculateShortestPath.utils';
import { calculateSortedPath } from './utils/calculateSortedPath.utils';
import { drawSelectedCity } from './utils/common/drawSelectedCity.utils';
import { drawSimplePath } from './utils/drawSimplePath.utils';
import {configMap} from '../../config/config'

export const useMap = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const { circlePoint, randomPoints, pathingInProgress, toClear } = useSelector(
    (state) => state.map
  );
  const { activeMode, clickPossible } = useSelector((state) => state.toggle);

  const updateCirclePoint = (newPoint) => {
    dispatch(setCirclePoint(newPoint));
  };

  const updateRandomPoints = useCallback(
    (newPoints) => {
      dispatch(setRandomPoints(newPoints));
    },
    [dispatch]
  );

  const updatePathingInProgres = useCallback(
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

  useEffect(() => {
    tempRandom(updateRandomPoints);
  }, [updateRandomPoints]);

  //base setup
  useEffect(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 2;
    context.imageSmoothingEnabled = true;
    clearMap(canvas, context);
    updateClearState(false);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black",false);
    finishDrawing(context);
  }, [
    circlePoint,
    randomPoints,
    toClear,
    pathingInProgress,
    activeMode,
    clickPossible,
    updateClearState
  ]);

  const handleCanvasClick = (event) => {
    if ((!clickPossible && configMap.clickPossibleTargets.includes(activeMode))) {
      console.log('click')
      return;
    }
    console.log('udany click')
    selectClickCity(canvasRef, event, updateCirclePoint, circlePoint);
  };
  const handleMouseMove = (event) => {
    if (!configMap.mouseMoveCities.includes(activeMode)) {
      return;
    }
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const selectedSize = 5;

    const selectedCoordinate = randomPoints.find(({ x, y }) => {
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      return distance <= selectedSize;
    });

    if (selectedCoordinate) {
      console.log("Object detected:", selectedCoordinate);
    }
  };

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    clearMap(canvas, context);
    updateClearState(false);
  }, [updateClearState]);

  const handleTSGClick = useCallback(() => {
    if (toClear|| pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      circlePoint,
      randomPoints,
      clickPossible,
      updatePathingInProgres,
      updateClearState,
      canvas,
      context
    );
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgres,
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
      updatePathingInProgres
    );
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgres,
  ]);

  const handleDateClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    updatePathingInProgres(true);
    clearMap(canvas, context);
    if (clickPossible) {
      drawSelectedCity(context, circlePoint, "red");
    }
    drawCities(context, randomPoints, "black", true);
    drawSimplePath(
      context,
      randomPoints,
      circlePoint,
      clickPossible,
      "black",
      updatePathingInProgres
    );
    finishDrawing(context);
    updateClearState(true);
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgres,
  ]);

  const handleRandomClick = useCallback(() => {
    if (toClear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    updatePathingInProgres(true);
    clearMap(canvas, context);
    if (clickPossible) {
      drawSelectedCity(context, circlePoint, "red");
    }
    drawCities(context, randomPoints, "black", true);
    drawSimplePath(
      context,
      randomPoints,
      circlePoint,
      clickPossible,
      "black",
      updatePathingInProgres,
      true
    );
    finishDrawing(context);
    updateClearState(true);
  }, [
    circlePoint,
    toClear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClearState,
    updatePathingInProgres,
  ]);

  return {
    canvasRef,
    toClear,
    pathingInProgress,
    activeMode,
    handleCanvasClick,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
    handleMouseMove,
  };
};
