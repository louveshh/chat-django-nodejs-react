import { clearMap } from './common/clearMap.utils';
import { drawSelectedCity } from './common/drawSelectedCity.utils';
import { drawCities } from './common/drawCities.utils';
import { drawPath } from './common/drawPath.utils';
import { finishDrawing } from './common/finishDrawing.utils';

export const calculateShortestPath = (
  circlePoint,
  randomPoints,
  clickPossible,
  setPathingInProgres,
  setClear,
  canvas,
  context
) => {
  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const drawTestingPathTSG = (
    shortestPath,
    animationIndex,
    cities,
    color
  ) => {
    context.strokeStyle = color;
    context.beginPath();
    shortestPath.forEach((point, index) => {
      if (index >= animationIndex) {
        cities.forEach((randomPoint) => {
          if (!shortestPath.includes(randomPoint)) {
            context.moveTo(point.x, point.y);
            context.lineTo(randomPoint.x, randomPoint.y);
          }
        });
      }
    });
    context.stroke();
    context.closePath();
  };

  const animatePath = () => {
    let index = 0;

    const animateStep = () => {
      if (remainingPoints.length === 0) {
        setPathingInProgres(false);
        return;
      }

      let shortestDistance = Infinity;
      let closestPoint = null;

      remainingPoints.forEach((point) => {
        const distance = calculateDistance(
          shortestPath[shortestPath.length - 1],
          point
        );

        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestPoint = point;
        }
      });

      shortestPath.push(closestPoint);
      remainingPoints.splice(remainingPoints.indexOf(closestPoint), 1);
      index++;

      clearMap(canvas, context);
      if (clickPossible) {
        drawSelectedCity(context, circlePoint, "red");
      }
      drawCities(context, randomPoints, "black", false);
      drawPath(context, shortestPath, "black");
      drawTestingPathTSG(shortestPath, index, randomPoints, "yellow");
      finishDrawing(context);

      setTimeout(animateStep, 500);
    };
    setTimeout(() => drawTestingPathTSG(shortestPath, index, randomPoints, "yellow"), 500);
    setTimeout(animateStep, 1000);
  };

 const moveStartObjectToStart = (array) => {
    const startObjectIndex = array.findIndex(obj => obj.selectedStart === true);
    if (startObjectIndex !== -1) {
      const startObject = array.splice(startObjectIndex, 1)[0];
      array.unshift(startObject);
    }
    return array;
  };

  const points = [...randomPoints];
  if (clickPossible) {
    points.unshift(circlePoint);
  }
  const modifiedPoints = moveStartObjectToStart(points);

  const remainingPoints = [...modifiedPoints];
  const shortestPath = [remainingPoints.shift()];
  setPathingInProgres(true);
  animatePath();
  setClear(true);
};