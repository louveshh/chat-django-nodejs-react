import { clearMap } from './common/clearMap.utils';
import { drawClickedCity } from './common/drawClickedCity.utils';
import { drawCities } from './common/drawCities.utils';
import { drawPath } from './common/drawPath.utils';
import { finishDrawing } from './common/finishDrawing.utils';
import { configMap } from '../../config/config';

export const calculateShortestPath = (
  canvas,
  context,
  circlePoint,
  randomPoints,
  clickPossible,
  setPathingInProgres,
  setClear
) => {
  const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const drawTestingPathTSG = (shortestPath, animationIndex, cities) => {
    context.strokeStyle = configMap.colors.testingLine;
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

  const animatePath = (remainingPoints, shortestPath) => {
    let index = 0;

    const animateStep = (remainingPoints, shortestPath) => {
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
        drawClickedCity(context, circlePoint);
      }
      drawCities(context, randomPoints);
      drawPath(context, shortestPath);
      drawTestingPathTSG(shortestPath, index, randomPoints);
      finishDrawing(context);

      setTimeout(() => {
        animateStep(remainingPoints, shortestPath);
      }, 500);
    };
    setTimeout(
      () => drawTestingPathTSG(shortestPath, index, randomPoints),
      500
    );
    setTimeout(() => {
      animateStep(remainingPoints, shortestPath);
    }, 1000);
  };

  const moveStartObjectToStart = (array) => {
    const startObjectIndex = array.findIndex(
      (obj) => obj.selectedStart === true
    );
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
  animatePath(remainingPoints, shortestPath);
  setClear(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(shortestPath);
    }, 1000 * (remainingPoints.length + 1));
  });
};
