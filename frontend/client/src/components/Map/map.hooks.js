import { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  drawCities,
  drawSelectedCity,
  selectCity,
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
} from "store/slices/map";

export const useMap = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const circlePoint = useSelector((state) => state.map.circlePoint);
  const randomPoints = useSelector((state) => state.map.randomPoints);
  const pathingInProgres = useSelector((state) => state.map.pathingInProgress);
  const clear = useSelector((state) => state.map.clear);

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
  const updatePathingInProgres = useCallback((inProgress) => {
    dispatch(setPathingInProgress(inProgress));
  },[dispatch]);

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
    if (clear || pathingInProgres) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    context.lineJoin = "round";
    context.lineCap = "round";
    context.imageSmoothingEnabled = true;
    clearRectangle(canvas, context);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black");
    finishDrawing(context);
  }, [circlePoint, randomPoints, clear, pathingInProgres]);

  const handleCanvasClick = (event) => {
    if (clear || pathingInProgres) {
      return;
    }
    selectCity(canvasRef, event, updateCirclePoint);
  };

  const handleClear = useCallback(() => {
    const { canvas, context } = getCanvasContext(canvasRef);
    clearRectangle(canvas, context);
    updateClear(false);
  }, [updateClear]);

  const handleTSGClick = useCallback(() => {
    if (clear || pathingInProgres) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      circlePoint,
      randomPoints,
      updatePathingInProgres,
      updateClear,
      canvas,
      context
    );
  }, [
    circlePoint,
    clear,
    pathingInProgres,
    randomPoints,
    updateClear,
    updatePathingInProgres,
  ]);

  ///

  const handleSortClick = useCallback(() => {
    if (clear || pathingInProgres) {
      return;
    }
    calculateSortedPath(
      randomPoints,
      circlePoint,
      canvasRef,
      updateClear,
      updatePathingInProgres
    );
  }, [
    circlePoint,
    clear,
    pathingInProgres,
    randomPoints,
    updateClear,
    updatePathingInProgres,
  ]);

  const handleDateClick = useCallback(() => {
    if (clear || pathingInProgres) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    updatePathingInProgres(true);
    clearRectangle(canvas, context);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black");
    drawSimplePath(
      context,
      randomPoints,
      circlePoint,
      "black",
      updatePathingInProgres
    );
    finishDrawing(context);
    updateClear(true);
  }, [
    circlePoint,
    clear,
    pathingInProgres,
    randomPoints,
    updateClear,
    updatePathingInProgres,
  ]);

  const handleRandomClick = useCallback(() => {
    if (clear || pathingInProgres) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    updatePathingInProgres(true);
    clearRectangle(canvas, context);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black");
    drawSimplePath(
      context,
      randomPoints,
      circlePoint,
      "black",
      updatePathingInProgres,
      true
    );
    finishDrawing(context);
    updateClear(true);
  }, [
    circlePoint,
    clear,
    pathingInProgres,
    randomPoints,
    updateClear,
    updatePathingInProgres,
  ]);

  return {
    canvasRef,
    handleCanvasClick,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
    clear,
    pathingInProgres,
  };
};
