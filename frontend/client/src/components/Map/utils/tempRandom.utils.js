export const tempRandom = (setRandomPoints) => {
  const points = [];
  const canvasWidth = 640;
  const canvasHeight = 640;
  const minDistance = 40;

  for (let i = 0; i < 10; i++) {
    const whileCond = true;
    while (whileCond) {
      const x = Math.random() * (canvasWidth - 2 * minDistance) + minDistance;
      const y = Math.random() * (canvasHeight - 2 * minDistance) + minDistance;
      const weight = Math.floor(Math.random() * 50);
      const selectedStart = false;
      const name = `name ${i}`;

      const closePoints = points.filter(
        (pos) =>
          Math.hypot(pos.x - x, pos.y - y) < minDistance ||
          x < minDistance ||
          x > canvasWidth - minDistance ||
          y < minDistance ||
          y > canvasHeight - minDistance
      );

      if (!closePoints.length) {
        points.push({ x, y, weight, selectedStart, name });
        break;
      }
    }
  }

  setRandomPoints(points);
};
