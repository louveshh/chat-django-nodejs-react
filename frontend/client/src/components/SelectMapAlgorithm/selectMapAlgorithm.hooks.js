import { useDispatch, useSelector } from 'react-redux';
import {
  setAlgorithm,
  setRandomPointsZero,
  setZeroStartCity,
  setClickPossible,
} from 'store/slices/map';

export const useSelectMapAlgorithm = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handleSelectMapAlgorithm = (event) => {
    dispatch(setAlgorithm(event.value));
    dispatch(setRandomPointsZero());
    dispatch(setZeroStartCity());
    dispatch(setClickPossible(false));
  };
  return { activeMode, handleSelectMapAlgorithm };
};