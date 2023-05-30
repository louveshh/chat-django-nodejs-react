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