export const selectClickCity = (
  canvasRef,
  event,
  setCirclePoint,
  circlePoint
) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  let x;
  let y;
  if (rect?.height > 321 && rect.width > 321) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    x = (event.clientX - rect.left) * 2;
    y = (event.clientY - rect.top) * 2;
  }

  const name = `click`;
  const { selectedStart, weight } = circlePoint;

  setCirclePoint({ x, y, weight, selectedStart, name });
};
