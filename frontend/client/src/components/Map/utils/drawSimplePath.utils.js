import { configMap } from "../../../config/config";
export const drawSimplePath = (
  context,
  points,
  circlePoint,
  clickPossible,
  setPathingInProgres,
  random = false
) => {
  context.strokeStyle = configMap.colors.line;
  context.beginPath();

  const fullPoints = [...points];

  if (clickPossible) {
    fullPoints.unshift(circlePoint);
  }

  if (random) {
    fullPoints.sort(() => Math.random() - 0.5);
  }

  let timeoutCounter = 0;
  const totalTimeouts = fullPoints.length;

  fullPoints.forEach((point, index) => {
    setTimeout(() => {
      if (index === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }

      context.stroke();

      timeoutCounter++;

      if (timeoutCounter === totalTimeouts) {
        setPathingInProgres(false);
      }
    }, 300 * index);
  });

  context.closePath();
};
