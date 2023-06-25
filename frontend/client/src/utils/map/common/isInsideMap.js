import { configDisplay } from 'config/config';

export const isInsideMap = (event, rect) => {
  let x;
  let y;
  if (
    rect?.height > configDisplay.SCALED_DISPLAY_SIZE() &&
    rect?.width > configDisplay.SCALED_DISPLAY_SIZE()
  ) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  } else {
    x = (event.clientX - rect.left) * configDisplay.SCALED_CLICK();
    y = (event.clientY - rect.top) * configDisplay.SCALED_CLICK();
  }
  return { x, y };
};
