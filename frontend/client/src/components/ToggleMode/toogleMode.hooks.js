import { useSelector, useDispatch } from 'react-redux';
import { toggleActiveMode } from 'store/slices/toggle';
import {
  setClickPossible,
  setRandomPointsZero,
  setZeroStartCity,
  setAlgorithm,
  setCirclePoint,
} from 'store/slices/map';

export const useToggleMode = () => {
  const { circlePoint } = useSelector((state) => state.map);
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const handleToggle = (buttonId) => {
    dispatch(toggleActiveMode(buttonId));
    dispatch(setClickPossible(false));
    dispatch(setRandomPointsZero());
    dispatch(setZeroStartCity());
    dispatch(setAlgorithm(null));
    dispatch(setCirclePoint({ ...circlePoint, weight: 0 }));
  };
  return { activeMode, handleToggle };
};
