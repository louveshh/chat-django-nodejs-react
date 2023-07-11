export const drawClickedCity = (
  theme,
  context,
  selectPointClick,
  weights = false
) => {
  if (selectPointClick.selectedStart) {
    context.beginPath();
    context.arc(selectPointClick.x, selectPointClick.y, 8, 0, 2 * Math.PI);
    context.fillStyle = theme.map.highlightedCity;
    context.fill();
    context.closePath();
  }
  if (weights) {
    context.fillStyle = theme.map.text;
    context.fillText(
      selectPointClick.weight.toString(),
      Number(selectPointClick.x) - 5,
      Number(selectPointClick.y) - 10
    );
  }
  context.beginPath();
  context.arc(selectPointClick.x, selectPointClick.y, 5, 0, 2 * Math.PI);
  context.fillStyle = theme.map.clickedCity;
  context.fill();
  context.closePath();
};
