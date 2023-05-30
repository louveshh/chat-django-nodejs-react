const drawPath = (context, shortestPath, color) => {
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

export const getCanvasContext = (canvasRef) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  return { canvas, context };
};

export const clearRectangle = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const finishDrawing = (context) => {
  context.stroke();
  context.closePath();
  context.strokeStyle = "black";
};

export const tempRandom = (setRandomPoints) => {
  const points = [];
  const canvasWidth = 640;
  const canvasHeight = 640;
  const minDistance = 40;
  for (let i = 0; i < 10; i++) {
    while (true) {
      const x = Math.random() * (canvasWidth - 2 * minDistance) + minDistance;
      const y = Math.random() * (canvasHeight - 2 * minDistance) + minDistance;
      const weight = Math.floor(Math.random() * 50);
      const selectedStart = false;
      const name = `name ${i}`

      const closePoints = points.filter(
        (pos) =>
          Math.hypot(pos.x - x, pos.y - y) < minDistance ||
          x < minDistance ||
          x > canvasWidth - minDistance ||
          y < minDistance ||
          y > canvasHeight - minDistance
      );

      if (!closePoints.length) {
        points.push({ x, y, weight, selectedStart, name});
        break;
      }
    }
  }
  setRandomPoints(points);
};

export const selectClickCity = (canvasRef, event, setCirclePoint,circlePoint) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const weight = Math.floor(Math.random() * 50);
  const name = `click`
  const selectedStart = circlePoint.selectedStart;
  setCirclePoint({ x, y, weight, selectedStart,name });
};

export const drawSelectedCity = (context, selectPointClick, color) => {
  if(selectPointClick.selectedStart){
    context.beginPath();
    context.arc(selectPointClick.x, selectPointClick.y, 8, 0, 2 * Math.PI);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();
  }
  context.beginPath();
  context.arc(selectPointClick.x, selectPointClick.y, 5, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

export const drawCities = (context, cities, color, weights = false) => {
  cities.forEach((point) => {
    if(point.selectedStart && !weights){
      console.log('xdDDD?', point)
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

export const drawSimplePath = (
  context,
  points,
  circlePoint,
  clickPossible,
  color,
  setPathingInProgres,
  random = false
) => {
  context.strokeStyle = color;
  context.beginPath();

  const fullPoints = [...points];
  if (clickPossible){
    fullPoints.unshift(circlePoint)
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
    context,
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

      clearRectangle(canvas, context);
      if (clickPossible) {
        drawSelectedCity(context, circlePoint, "red");
      }
      drawCities(context, randomPoints, "black", false);
      drawPath(context, shortestPath, "black");
      drawTestingPathTSG(context, shortestPath, index, randomPoints, "yellow");
      finishDrawing(context);

      setTimeout(animateStep, 500);
    };
    setTimeout(drawTestingPathTSG(context, shortestPath, index, randomPoints, "yellow"), 500);
    setTimeout(animateStep, 1000);
  };
    const moveStartObjectToStart = (array) => {
    const startObjectIndex = array.findIndex(obj => obj.selectedStart === true);
    if (startObjectIndex !== -1) {
      const startObject = array.splice(startObjectIndex, 1)[0];
      console.log('ty1?',array)
      return array.unshift(startObject);
    }
    console.log('ty2?',array)
    return array
  }
  const points = [...randomPoints];
  if (clickPossible) {
    points.unshift(circlePoint);
  }
  console.log(moveStartObjectToStart(points))

  const remainingPoints = [...points];
  const shortestPath = [remainingPoints.shift()];
  setPathingInProgres(true);
  animatePath();
  setClear(true);

};
export const calculateSortedPath = async (
  randomPoints,
  circlePoint,
  clickPossible,
  canvas,
  context,
  setClear,
  setPathingInProgres,
) => {
  const points = [...randomPoints];
  console.log(points)
  clearRectangle(canvas, context);
  if (clickPossible) {
    drawSelectedCity(context, circlePoint, "red");
    points.unshift(circlePoint)
  }
  drawCities(context, randomPoints, "black", true);

  const customSort = async (arr, start, end) => {
    if (start >= end) {
      return;
    }
    const pivotIndex = await partition(arr, start, end);

    drawPath(context, arr, "black");
    await customSort(arr, start, pivotIndex - 1);
    await customSort(arr, pivotIndex + 1, end);
  };

  const drawTestingPathSort = (context, arr, j, end, color) => {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(arr[j].x, arr[j].y);
    context.lineTo(arr[end].x, arr[end].y);
    context.stroke();
    finishDrawing(context);
  };

  const partition = async (arr, start, end) => {
    const pivot = arr[end].weight;
    let i = start - 1;

    for (let j = start; j < end; j++) {
      drawTestingPathSort(context, arr, j, end, "yellow");
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (arr[j].weight < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    const temp = arr[i + 1];
    arr[i + 1] = arr[end];
    arr[end] = temp;
    clearRectangle(canvas, context);
    if (clickPossible) {
      drawSelectedCity(context, circlePoint, "red");
    }
    drawCities(context, randomPoints, "black", true);
    return i + 1;
  };

  setClear(true);
  setPathingInProgres(true);
  await customSort(points, 0, points.length - 1);
  setPathingInProgres(false);
};


