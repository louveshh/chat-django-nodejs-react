import { configDisplay } from '../../config/config';

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
  if (
    rect?.height > configDisplay.SCALED_DISPLAY_SIZE() &&
    rect.width > configDisplay.SCALED_DISPLAY_SIZE()
  ) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    x = (event.clientX - rect.left) * configDisplay.SCALED_CLICK();
    y = (event.clientY - rect.top) * configDisplay.SCALED_CLICK();
  }

  const name = `click`;
  const { selectedStart, weight } = circlePoint;

  setCirclePoint({ x, y, weight, selectedStart, name });
};
