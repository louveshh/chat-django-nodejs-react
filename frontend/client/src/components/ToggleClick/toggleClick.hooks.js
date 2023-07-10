import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  setOwnSelectedCityZero,
  setcityPointsZero,
  setToggleClickPossible,
} from 'store/slices/map';
import { map } from 'config/config';

export const useToggleCLick = () => {
  const { clickPossible, algorithm } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateToggleClickPossible = useCallback(() => {
    dispatch(setToggleClickPossible());
  }, [dispatch]);

  const updatecityPointsZero = useCallback(() => {
    dispatch(setcityPointsZero());
  }, [dispatch]);

  const updateOwnSelectedCityZero = useCallback(
    (payload) => {
      dispatch(setOwnSelectedCityZero(payload));
    },
    [dispatch]
  );

  const handleClick = () => {
    updateToggleClickPossible();
    updatecityPointsZero();
    if (algorithm === map.tsg) {
      updateOwnSelectedCityZero(true);
    } else {
      updateOwnSelectedCityZero(false);
    }
  };
  return { clickPossible, t, handleClick };
};
