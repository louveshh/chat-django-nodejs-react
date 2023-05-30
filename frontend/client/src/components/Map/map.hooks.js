import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClear,
  setCirclePointZero, setRandomPointsZero
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

  const { circlePoint, randomPoints, pathingInProgress, clear } = useSelector(
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

  const updateClear = useCallback(
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
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 2;
    context.imageSmoothingEnabled = true;
    clearMap(canvas, context);
    updateClear(false);
    if ((configMap.useEffect.includes(activeMode)  && clickPossible) ||activeMode === "add") {
      drawSelectedCity(context, circlePoint, "red");
    }
    drawCities(context, randomPoints, "black",false);
    finishDrawing(context);
  }, [
    circlePoint,
    randomPoints,
    clear,
    pathingInProgress,
    activeMode,
    clickPossible,
    updateClear
  ]);

  const handleCanvasClick = (event) => {
    if (
      (clear ||
      pathingInProgress ||
      activeMode === "display" ||
      activeMode === "combo" ||
      !clickPossible)  && activeMode !== "add"
    ) {
      return;
    }
    selectClickCity(canvasRef, event, updateCirclePoint, circlePoint);
  };
  const handleMouseMove = (event) => {
    if (activeMode === "combo") {
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
    updateClear(false);
  }, [updateClear]);

  const handleTSGClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      circlePoint,
      randomPoints,
      clickPossible,
      updatePathingInProgres,
      updateClear,
      canvas,
      context
    );
  }, [
    circlePoint,
    clear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClear,
    updatePathingInProgres,
  ]);

  const handleSortClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateSortedPath(
      randomPoints,
      circlePoint,
      clickPossible,
      canvas,
      context,
      updateClear,
      updatePathingInProgres
    );
  }, [
    circlePoint,
    clear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClear,
    updatePathingInProgres,
  ]);

  const handleDateClick = useCallback(() => {
    if (clear || pathingInProgress) {
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
    updateClear(true);
  }, [
    circlePoint,
    clear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClear,
    updatePathingInProgres,
  ]);

  const handleRandomClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    dispatch(setCirclePointZero());
    dispatch(setRandomPointsZero());
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
    updateClear(true);
  }, [
    circlePoint,
    clear,
    pathingInProgress,
    randomPoints,
    clickPossible,
    updateClear,
    updatePathingInProgres,
    dispatch
  ]);

  return {
    canvasRef,
    clear,
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
