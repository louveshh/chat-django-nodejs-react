export const drawPath = (context, shortestPath, color) => {
  context.strokeStyle = color;
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