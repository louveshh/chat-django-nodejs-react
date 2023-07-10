export const drawCities = (
  theme,
  context,
  cities,
  weights = false,
  names = false
) => {
  cities.forEach((point) => {
    if (point.selectedStart) {
      context.beginPath();
      context.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      context.fillStyle = theme.map.highlightedCity;
      context.fill();
      context.closePath();
    }
    context.beginPath();
    context.fillStyle = theme.map.city;
    context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    if (weights) {
      context.fillStyle = 'black';
      context.font = `15px Arial`;
      context.fillText(point.weight.toString(), point.x + 7, point.y + 7);
      context.fill();
      context.closePath();
    }
    if (names) {
      context.fillStyle = 'black';
      context.font = `15px Arial`;
      context.fillText(point.name.toString(), point.x + 7, point.y + 7);
      context.fill();
      context.closePath();
    }
    context.fillStyle = theme.map.city;
    context.fill();
    context.closePath();
  });
};
