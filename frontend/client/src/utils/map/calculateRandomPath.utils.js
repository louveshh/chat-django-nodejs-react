export const calculateRandomPath = (
  theme,
  canvas,
  context,
  clickPossible,
  ownSelectedCity,
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
    drawClickedCity(theme, context, ownSelectedCity);
  }
  drawCities(theme, context, randomPoints, false);
  drawSimplePath(
    theme,
    context,
    randomPoints,
    ownSelectedCity,
    clickPossible,
    updatePathingInProgress,
    true
  );
  updateClearState(true);
};
