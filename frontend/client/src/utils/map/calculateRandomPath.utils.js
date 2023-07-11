export const calculateRandomPath = (
  theme,
  canvas,
  context,
  clickPossible,
  ownSelectedCity,
  cityPoints,
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
  drawCities(theme, context, cityPoints, false);
  drawSimplePath(
    theme,
    context,
    cityPoints,
    ownSelectedCity,
    clickPossible,
    updatePathingInProgress,
    true
  );
  updateClearState(true);
};
