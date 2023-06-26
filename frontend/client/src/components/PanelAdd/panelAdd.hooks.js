import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setAddOwnCity, setOwnSelectedCity } from 'store/slices/map';

export const usePanelAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ownSelectedCity } = useSelector((state) => state.map);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const updateAddOwnCity = useCallback(
    (payload) => {
      dispatch(setAddOwnCity(payload));
    },
    [dispatch]
  );
  const updateOwnSelectedCity = useCallback(
    (payload) => {
      dispatch(setOwnSelectedCity(payload));
    },
    [dispatch]
  );

  const handleInput = (event) => {
    const name = event.target.value;
    const newOwnSelectedCity = { ...ownSelectedCity, name };
    updateOwnSelectedCity(newOwnSelectedCity);
  };

  const handleBar = (event) => {
    const barValue = parseFloat(event.target.value);
    const newOwnSelectedCity = { ...ownSelectedCity, weight: barValue };
    updateOwnSelectedCity(newOwnSelectedCity);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!ownSelectedCity) {
      return;
    }
    if (!isAuthenticated) {
      // notify auth
    }
    const { email } = user;
    const { x, y, weight, name } = ownSelectedCity;
    updateAddOwnCity({ email, x, y, weight, name });
  };

  return { t, handleBar, handleInput, onSubmit };
};
