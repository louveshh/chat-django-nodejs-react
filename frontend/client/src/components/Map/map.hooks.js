import { useState, useRef, useEffect } from "react";
import {
  drawCities,
  drawPath,
  drawSelectedCity,
  selectCity,
  tempRandom,
  calculateShortestPath,
  getCanvasContext,
  clearRectangle,
  finishDrawing,
  calculateSortedPath,
} from "./map.utils";

export const useMap = () => {
  const [circlePoint, setCirclePoint] = useState({ x: 30, y: 30, weight: 0 });
  const [randomPoints, setRandomPoints] = useState([]);
  const [pathingInProgres, setPathingInProgres] = useState(false);
  const [clear, setClear] = useState(false);
  const canvasRef = useRef(null);

  const handleCanvasClick = (event) => {
    if ( clear || pathingInProgres) {
      return;
    }
    selectCity(canvasRef, event, setCirclePoint);
  };

  const handleClear = () => {
    const { canvas, context } = getCanvasContext(canvasRef);
    clearRectangle(canvas, context);
    setClear(false);
  };

  useEffect(() => {
    tempRandom(setRandomPoints);
  }, []);

  //base setup
  useEffect(() => {
    if ( clear || pathingInProgres) {
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

  // useEffect(() => {
  //   if (pathingInProgres) {
  //     const { canvas, context } = getCanvasContext(canvasRef);
  //     clearRectangle(canvas, context);
  //     drawSelectedCity(context, circlePoint, "red");
  //     drawCities(context, randomPoints, "black");
  //     drawPath(context, shortestPath, "black");
  //     drawTestingPathTSG(
  //       context,
  //       shortestPath,
  //       animationIndex,
  //       randomPoints,
  //       "yellow"
  //     );

  //     finishDrawing(context);
  //   }
  //   console.log(    animationIndex,
  //     randomPoints,
  //     shortestPath,
  //     pathingInProgres,
  //     circlePoint,)
  // }, [
  //   animationIndex,
  //   randomPoints,
  //   shortestPath,
  //   pathingInProgres,
  //   circlePoint,
  // ]);

  const handleTSGClick = () => {
    if ( clear || pathingInProgres) {
      return;
    }
    const { canvas, context } = getCanvasContext(canvasRef);
    calculateShortestPath(
      circlePoint,
      randomPoints,
      setPathingInProgres,
      setClear,canvas, context
    );
  };

  ///

  const handleSortClick = () => {
    if ( clear || pathingInProgres) {
      return;
    }
    calculateSortedPath(
      randomPoints,
      circlePoint,
      canvasRef,
      setClear,
      setPathingInProgres
    );
  };
  const handleDateClick = () => {
    if ( clear || pathingInProgres) {
      return;
    }
    const points = [...randomPoints, circlePoint];
    setClear(false)
    setPathingInProgres(true);
    const { canvas, context } = getCanvasContext(canvasRef);
    clearRectangle(canvas, context);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black");
    drawPath(context, points, "black",true);
    finishDrawing(context);
    setClear(true)
    setPathingInProgres(false);
  };
  const handleRandomClick = () => {
    if ( clear || pathingInProgres) {
      return;
    }
    const points = [...randomPoints, circlePoint];
    setClear(false)
    setPathingInProgres(true);
    const { canvas, context } = getCanvasContext(canvasRef);
    clearRectangle(canvas, context);
    drawSelectedCity(context, circlePoint, "red");
    drawCities(context, randomPoints, "black");
    drawPath(context, points.sort(() => Math.random() - 0.5), "black",true);
    finishDrawing(context);
    setClear(true)
    setPathingInProgres(false);
  };

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
