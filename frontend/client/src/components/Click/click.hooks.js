import { useSelector, useDispatch } from 'react-redux';
import {
  setCirclePointZero,
  setRandomPointsZero,
  toggleClickPossible,
} from 'store/slices/map';

export const useCLick = () => {
  const { clickPossible, algorithm } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleClickPossible());
    dispatch(setRandomPointsZero(true));
    dispatch(setCirclePointZero());
    console.log(algorithm);
    if (algorithm === 'tsg') {
      console.log('tu?');
      dispatch(setCirclePointZero(true));
    } else {
      dispatch(setCirclePointZero(false));
    }
  };
  return { clickPossible, handleClick };
};
