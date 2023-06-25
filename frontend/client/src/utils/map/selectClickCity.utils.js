import { toast } from 'react-toastify';
import { isCityFarEnough } from './common/isCityFarEnough';
import { isInsideMap } from './common/isInsideMap';

export const selectClickCity = (
  canvasRef,
  event,
  setCirclePoint,
  circlePoint,
  randomPoints
) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const { x, y } = isInsideMap(event, rect);

  const name = `click`;
  const { selectedStart, weight } = circlePoint;
  const farEnoughtNewCity = isCityFarEnough(randomPoints, x, y, 50);

  if (farEnoughtNewCity) {
    toast.warn('Too close!', {
      position: 'bottom-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
    return;
  }

  setCirclePoint({ x, y, weight, selectedStart, name });
};
