import { configMap } from '../../../config/config';

export const drawClickedCity = (context, selectPointClick, weights = false) => {
  if (selectPointClick.selectedStart) {
    context.beginPath();
    context.arc(selectPointClick.x, selectPointClick.y, 8, 0, 2 * Math.PI);
    context.fillStyle = configMap.colors.highlightedCity;
    context.fill();
    context.closePath();
  }
  if (weights) {
    context.fillStyle = 'red';
    context.fillText(
      selectPointClick.weight.toString(),
      selectPointClick.x + 7,
      selectPointClick.y + 7
    );
  }
  context.beginPath();
  context.arc(selectPointClick.x, selectPointClick.y, 5, 0, 2 * Math.PI);
  context.fillStyle = configMap.colors.clickedCity;
  context.fill();
  context.closePath();
};
