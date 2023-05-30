export const getCanvasContext = (canvasRef) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  return { canvas, context };
};
