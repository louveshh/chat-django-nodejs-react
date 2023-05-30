export const finishDrawing = (context) => {
  context.stroke();
  context.closePath();
  context.strokeStyle = "black";
};
