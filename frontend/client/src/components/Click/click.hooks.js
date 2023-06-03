import { useSelector, useDispatch } from 'react-redux';
import {
  setCirclePointZero,
  setRandomPointsZero,
  toggleClickPossible,
} from 'store/slices/map';

export const useCLick = () => {
  const isClickable = useSelector((state) => state.map.clickPossible);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleClickPossible());
    dispatch(setCirclePointZero());
    dispatch(setRandomPointsZero());
  };
  return { isClickable, handleClick };
};
