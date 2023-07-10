import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { translateOptions } from 'utils/common/translateOptions';
import { configMap } from 'config/config';
import {
  setAlgorithm,
  setcityPointsZero,
  setZeroStartCity,
  setClickPossible,
} from 'store/slices/map';

export const useSelectMapAlgorithm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const options = useMemo(
    () => translateOptions(t, configMap.algorithmOptions),
    [t]
  );

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );

  const updatecityPointsZero = useCallback(() => {
    dispatch(setcityPointsZero());
  }, [dispatch]);

  const updateZeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const updateClickPossible = useCallback(
    (payload) => {
      dispatch(setClickPossible(payload));
    },
    [dispatch]
  );

  const handleSelectMapAlgorithm = (event) => {
    updateAlgorithm(event.value);
    updatecityPointsZero();
    updateZeroStartCity();
    updateClickPossible(false);
  };
  return { options, t, handleSelectMapAlgorithm };
};
