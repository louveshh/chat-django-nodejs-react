import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setOwnSelectedCity } from 'store/slices/map';
import { useTranslation } from 'react-i18next';

export const useBarWeight = () => {
  const [weightBar, setWeightBar] = useState(false);
  const { ownSelectedCity } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    setWeightBar((prev) => !prev);
    const newOwnSelectedCity = { ...ownSelectedCity, weight: 0 };
    dispatch(setOwnSelectedCity(newOwnSelectedCity));
  };

  const updateOwnSelectedCity = useCallback(
    (payload) => {
      dispatch(setOwnSelectedCity(payload));
    },
    [dispatch]
  );

  const handleBar = (event) => {
    const barValue = parseFloat(event.target.value);
    let newBarValue = barValue;
    if (barValue <= 1) {
      newBarValue = -Infinity;
    } else if (barValue >= 49) {
      newBarValue = Infinity;
    }
    const newOwnSelectedCity = { ...ownSelectedCity, weight: newBarValue };
    updateOwnSelectedCity(newOwnSelectedCity);
  };
  return { weightBar, t, handleClick, handleBar };
};
