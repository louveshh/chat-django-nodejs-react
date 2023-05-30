export const calculateRandomPath = (
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
  updateClearState(false);
  if (clickPossible) {
    drawClickedCity(context, circlePoint);
  }
  drawCities(context, randomPoints, true);
  drawSimplePath(
    context,
    randomPoints,
    circlePoint,
    clickPossible,
    updatePathingInProgress,
    true
  );
  finishDrawing(context);
  updateClearState(true);
};
