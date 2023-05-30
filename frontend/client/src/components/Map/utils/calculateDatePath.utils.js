export const calculateDatePath = (
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
) => {
  updatePathingInProgress(true);

  clearMap(canvas, context);

  if (clickPossible) {
    drawClickedCity(context, circlePoint);
  }
  drawCities(context, randomPoints, true);
  drawSimplePath(
    context,
    randomPoints,
    circlePoint,
    clickPossible,
    updatePathingInProgress
  );
  finishDrawing(context);
  updateClearState(true);
};
