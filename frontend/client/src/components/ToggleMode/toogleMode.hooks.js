import { useSelector, useDispatch } from 'react-redux';
import { setToggleActiveMode } from 'store/slices/toggle';
import {
  setClickPossible,
  setRandomPointsZero,
  setZeroStartCity,
  setAlgorithm,
  setCirclePoint,
  setZeroStartCityFiltered,
} from 'store/slices/map';
import { setAlgorithm as setAlgorithmBoard } from 'store/slices/board';

export const useToggleMode = () => {
  const { circlePoint } = useSelector((state) => state.map);
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const handleToggle = (buttonId) => {
    dispatch(setToggleActiveMode(buttonId));
    dispatch(setClickPossible(false));
    dispatch(setRandomPointsZero());
    dispatch(setZeroStartCity());
    dispatch(setZeroStartCityFiltered());
    dispatch(setAlgorithm(null));
    dispatch(setAlgorithmBoard(null));
    dispatch(setCirclePoint({ ...circlePoint, weight: 0 }));
  };
  return { activeMode, handleToggle };
};
