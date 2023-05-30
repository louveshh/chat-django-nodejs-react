import { configMap } from "../../../../config/config";
export const drawClickedCity = (context, selectPointClick) => {
  if (selectPointClick.selectedStart) {
    context.beginPath();
    context.arc(selectPointClick.x, selectPointClick.y, 8, 0, 2 * Math.PI);
    context.fillStyle = configMap.color.highlightedCity;
    context.fill();
    context.closePath();
  }
  context.beginPath();
  context.arc(selectPointClick.x, selectPointClick.y, 5, 0, 2 * Math.PI);
  context.fillStyle = configMap.colors.clickedCity;
  context.fill();
  context.closePath();
};
