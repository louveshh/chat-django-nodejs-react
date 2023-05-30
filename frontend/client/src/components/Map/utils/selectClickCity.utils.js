export const selectClickCity = (
  canvasRef,
  event,
  setCirclePoint,
  circlePoint
) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const weight = Math.floor(Math.random() * 50);
  const name = `click`;
  const selectedStart = circlePoint.selectedStart;

  setCirclePoint({ x, y, weight, selectedStart, name });
};
