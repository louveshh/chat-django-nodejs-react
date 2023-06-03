import { clearMap } from './common/clearMap.utils';
import { drawClickedCity } from './common/drawClickedCity.utils';
import { drawCities } from './common/drawCities.utils';
import { drawPath } from './common/drawPath.utils';
import { finishDrawing } from './common/finishDrawing.utils';
import { configMap } from '../../config/config';

const drawTestingPathSort = (context, arr, startIndex, lastIndex) => {
  context.strokeStyle = configMap.colors.testingLine;
  context.beginPath();
  context.moveTo(arr[startIndex].x, arr[startIndex].y);
  context.lineTo(arr[lastIndex].x, arr[lastIndex].y);
  context.stroke();
  finishDrawing(context);
};

export const calculateSortedPath = async (
  randomPoints,
  circlePoint,
  clickPossible,
  canvas,
  context,
  setClear,
  setPathingInProgress
) => {
  const partition = async (array, startIndex, endIndex) => {
    const pivot = array[endIndex].weight;
    let smallerElementIndex = startIndex - 1;

    const processElement = async (i) => {
      drawTestingPathSort(context, array, i, endIndex);
      return new Promise((resolve) => {
        setTimeout(() => {
          if (array[i].weight < pivot) {
            smallerElementIndex++;
            const temp = array[smallerElementIndex];
            array[smallerElementIndex] = array[i];
            array[i] = temp;
          }
          resolve();
        }, 600);
      });
    };

    await Promise.all(
      Array.from({ length: endIndex - startIndex }, (_, index) =>
        processElement(startIndex + index)
      )
    );

    const pivotIndex = smallerElementIndex + 1;
    const temp = array[pivotIndex];
    array[pivotIndex] = array[endIndex];
    array[endIndex] = temp;

    clearMap(canvas, context);
    if (clickPossible) {
      drawClickedCity(context, circlePoint);
    }
    drawCities(context, randomPoints, true);

    return pivotIndex;
  };

  const customSort = async (array, startIndex, endIndex) => {
    if (startIndex >= endIndex) {
      return;
    }

    const pivotIndex = await partition(array, startIndex, endIndex);
    drawPath(context, array);

    await customSort(array, startIndex, pivotIndex - 1);
    await customSort(array, pivotIndex + 1, endIndex);
  };

  const points = [...randomPoints];
  clearMap(canvas, context);
  if (clickPossible) {
    drawClickedCity(context, circlePoint);
    points.unshift(circlePoint);
  }
  drawCities(context, randomPoints, true);
  setClear(true);
  setPathingInProgress(true);
  await customSort(points, 0, points.length - 1);
  setPathingInProgress(false);
};
