import { configMap } from '../../../../config/config';

export const finishDrawing = (context) => {
  context.stroke();
  context.closePath();
  context.strokeStyle = configMap.colors.line;
};
