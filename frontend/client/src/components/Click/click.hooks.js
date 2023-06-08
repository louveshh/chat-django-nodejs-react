import { useSelector, useDispatch } from 'react-redux';
import {
  setCirclePointZero,
  setRandomPointsZero,
  setToggleClickPossible,
} from 'store/slices/map';

export const useCLick = () => {
  const { clickPossible, algorithm } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setToggleClickPossible());
    dispatch(setRandomPointsZero());
    if (algorithm === 'tsg') {
      dispatch(setCirclePointZero(true));
    } else {
      dispatch(setCirclePointZero(false));
    }
  };
  return { clickPossible, handleClick };
};
