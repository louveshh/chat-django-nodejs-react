import { toast } from 'react-toastify';
import { isCityFarEnough } from './common/isCityFarEnough';
import { isInsideMap } from './common/isInsideMap';

export const selectClickCity = (
  canvasRef,
  event,
  setOwnSelectedCity,
  ownSelectedCity,
  randomPoints
) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const { x, y } = isInsideMap(event, rect);

  const name = `click`;
  const { selectedStart, weight } = ownSelectedCity;
  const farEnoughtNewCity = isCityFarEnough(randomPoints, x, y, 20);

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
  const roundX = x.toFixed(1);
  const roundY = y.toFixed(1);

  setOwnSelectedCity({ x: roundX, y: roundY, weight, selectedStart, name });
};
