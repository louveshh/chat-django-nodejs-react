import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  drawCities,
  drawSelectedCity,
  selectClickCity,
  tempRandom,
  calculateShortestPath,
  getCanvasContext,
  clearRectangle,
  finishDrawing,
  calculateSortedPath,
  drawSimplePath,
} from "./map.utils";
import {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClear,
  setCirclePointZero, setRandomPointsZero
} from "store/slices/map";

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

  // Example usage of dispatch to update state
  const updateRandomPoints = useCallback(
    (newPoints) => {
      dispatch(setRandomPoints(newPoints));
    },
    [dispatch]
  );

  // Example usage of dispatch to update state
  const updatePathingInProgres = useCallback(
    (inProgress) => {
      dispatch(setPathingInProgress(inProgress));
    },
    [dispatch]
  );

  // Example usage of dispatch to update state
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
    context.imageSmoothingEnabled = true;
    clearRectangle(canvas, context);
    if ((activeMode == "map"  && clickPossible) ||activeMode === "add") {
      drawSelectedCity(context, circlePoint, "red");
    }
    context.lineWidth = 2;
    drawCities(context, randomPoints, "black",false);
    finishDrawing(context);
  }, [
    circlePoint,
    randomPoints,
    clear,
    pathingInProgress,
    activeMode,
    clickPossible,
  ]);

  const handleCanvasClick = (event) => {
    if (
      (clear ||
      pathingInProgress ||
      activeMode === "display" ||
      activeMode === "combo" ||
      !clickPossible)  && activeMode !== "add"
    ) {
      console.log('xdddd')
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

    // Find the matching coordinate
    const selectedCoordinate = randomPoints.find(({ x, y }) => {
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      return distance <= selectedSize;
    });

    if (selectedCoordinate) {
      // Object found
      console.log("Object detected:", selectedCoordinate);
    }
  };

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    clearRectangle(canvas, context);
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

  ///

  const handleSortClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    dispatch(setCirclePointZero(false));
    dispatch(setRandomPointsZero(false));
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
    dispatch,
  ]);

  const handleDateClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    dispatch(setCirclePointZero(false));
    dispatch(setRandomPointsZero(false));
    updatePathingInProgres(true);
    clearRectangle(canvas, context);
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
    dispatch
  ]);

  const handleRandomClick = useCallback(() => {
    if (clear || pathingInProgress) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    dispatch(setCirclePointZero());
    dispatch(setRandomPointsZero());
    updatePathingInProgres(true);
    clearRectangle(canvas, context);
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
