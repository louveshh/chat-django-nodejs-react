import { clearMap } from "./common/clearMap.utils";
import { drawSelectedCity } from "./common/drawSelectedCity.utils";
import { drawCities } from "./common/drawCities.utils";
import { drawPath } from "./common/drawPath.utils";
import { finishDrawing } from "./common/finishDrawing.utils";

const drawTestingPathSort = (context, arr, startIndex, lastIndex, color) => {
  context.strokeStyle = color;
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

    for (let i = startIndex; i < endIndex; i++) {
      drawTestingPathSort(context, array, i, endIndex, "yellow");
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (array[i].weight < pivot) {
        smallerElementIndex++;
        const temp = array[smallerElementIndex];
        array[smallerElementIndex] = array[i];
        array[i] = temp;
      }
    }

    const pivotIndex = smallerElementIndex + 1;
    const temp = array[pivotIndex];
    array[pivotIndex] = array[endIndex];
    array[endIndex] = temp;

    clearMap(canvas, context);
    if (clickPossible) {
      drawSelectedCity(context, circlePoint, "red");
    }
    drawCities(context, randomPoints, "black", true);

    return pivotIndex;
  };

  const customSort = async (array, startIndex, endIndex) => {
    if (startIndex >= endIndex) {
      return;
    }

    const pivotIndex = await partition(array, startIndex, endIndex);
    drawPath(context, array, "black");

    await customSort(array, startIndex, pivotIndex - 1);
    await customSort(array, pivotIndex + 1, endIndex);
  };

  const points = [...randomPoints];

  clearMap(canvas, context);

  if (clickPossible) {
    drawSelectedCity(context, circlePoint, "red");
    points.unshift(circlePoint);
  }

  drawCities(context, randomPoints, "black", true);
  setClear(true);
  setPathingInProgress(true);

  await customSort(points, 0, points.length - 1);

  setPathingInProgress(false);
};