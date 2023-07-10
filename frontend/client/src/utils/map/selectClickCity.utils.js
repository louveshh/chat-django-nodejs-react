import { isCityFarEnough } from './common/isCityFarEnough';
import { isInsideMap } from './common/isInsideMap';
import { warningManager } from '../toastify/warning';

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

  const { selectedStart, weight, name } = ownSelectedCity;
  const farEnoughtNewCity = isCityFarEnough(randomPoints, x, y, 20);

  if (farEnoughtNewCity) {
    warningManager({ render: 'Too close to the next city!' });
    return;
  }
  const roundX = x.toFixed(1);
  const roundY = y.toFixed(1);

  setOwnSelectedCity({ x: roundX, y: roundY, weight, selectedStart, name });
};
