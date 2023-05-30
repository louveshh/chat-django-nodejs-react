import { finishDrawing } from './finishDrawing.utils';
export const drawCities = (context, cities, color, weights = false) => {
  cities.forEach((point) => {
    if(point.selectedStart && !weights){
      context.beginPath();
      context.arc(point.x, point.y, 8, 0, 2 * Math.PI);
      context.fillStyle = 'yellow';
      context.fill();
      context.closePath();
    }
      context.beginPath();
      context.fillStyle = color;
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    if (weights) {
      context.fillStyle = "black";
      context.fillText(point.weight.toString(), point.x + 7, point.y + 7);
    }
    context.fill();
    finishDrawing(context)
  });
};