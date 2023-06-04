import { useSelector, useDispatch } from 'react-redux';
import { toggleActiveMode } from 'store/slices/toggle';
import {
  setClickPossible,
  setRandomPointsZero,
  setZeroStartCity,
  setAlgorithm,
} from 'store/slices/map';

export const useToggleMode = () => {
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const handleToggle = (buttonId) => {
    dispatch(toggleActiveMode(buttonId));
    dispatch(setClickPossible(false));
    dispatch(setRandomPointsZero());
    dispatch(setZeroStartCity());
    dispatch(setAlgorithm(null));
  };
  return { activeMode, handleToggle };
};
