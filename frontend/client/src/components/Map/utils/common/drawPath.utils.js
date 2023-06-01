import { configMap } from '../../../../config/config';

export const drawPath = (context, shortestPath) => {
  context.strokeStyle = configMap.colors.line;
  context.beginPath();

  shortestPath.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
    } else {
      context.lineTo(point.x, point.y);
    }
    context.stroke();
  });
  context.closePath();
};
