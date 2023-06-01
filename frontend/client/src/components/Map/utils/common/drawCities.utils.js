import { configMap } from '../../../../config/config';
import { finishDrawing } from './finishDrawing.utils';

export const drawCities = (context, cities, weights = false) => {
  cities.forEach((point) => {
    if (point.selectedStart) {
      context.beginPath();
      context.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      context.fillStyle = configMap.colors.highlightedCity;
      context.fill();
      context.closePath();
    }
    context.beginPath();
    context.fillStyle = configMap.colors.city;
    context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    if (weights) {
      context.fillStyle = configMap.colors.city;
      context.fillText(point.weight.toString(), point.x + 7, point.y + 7);
    }
    context.fill();
    finishDrawing(context);
  });
};
