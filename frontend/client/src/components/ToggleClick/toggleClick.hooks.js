import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCirclePointZero, setRandomPointsZero, setToggleClickPossible } from 'store/slices/map';
import { map } from 'config/config';

export const useToggleCLick = () => {
  const { clickPossible, algorithm } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const updateToggleClickPossible = useCallback(() => {
    dispatch(setToggleClickPossible());
  }, [dispatch]);

  const updateRandomPointsZero = useCallback(() => {
    dispatch(setRandomPointsZero());
  }, [dispatch]);

  const updateCirclePointZero = useCallback(
    (payload) => {
      dispatch(setCirclePointZero(payload));
    },
    [dispatch]
  );

  const handleClick = () => {
    updateToggleClickPossible();
    updateRandomPointsZero();
    if (algorithm === map.tsg) {
      updateCirclePointZero(true);
    } else {
      updateCirclePointZero(false);
    }
  };
  return { clickPossible, handleClick };
};
