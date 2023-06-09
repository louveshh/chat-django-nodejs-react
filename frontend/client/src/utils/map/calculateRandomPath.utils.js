export const calculateRandomPath = (
  theme,
  canvas,
  context,
  clickPossible,
  circlePoint,
  randomPoints,
  clearMap,
  updatePathingInProgress,
  drawClickedCity,
  drawCities,
  drawSimplePath,
  updateClearState
) => {
  updatePathingInProgress(true);
  clearMap(canvas, context);
  updateClearState(false);
  if (clickPossible) {
    drawClickedCity(theme, context, circlePoint);
  }
  drawCities(theme, context, randomPoints, false);
  drawSimplePath(
    theme,
    context,
    randomPoints,
    circlePoint,
    clickPossible,
    updatePathingInProgress,
    true
  );
  updateClearState(true);
};
