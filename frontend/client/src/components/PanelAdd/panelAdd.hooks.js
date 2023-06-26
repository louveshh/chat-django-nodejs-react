import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setAddOwnCity,
  setOwnSelectedCity,
  setRemoveOwnCity,
} from 'store/slices/map';

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

  const updateRemoveOwnCity = useCallback(
    (payload) => {
      dispatch(setRemoveOwnCity(payload));
    },
    [dispatch]
  );
  const updateOwnSelectedCity = useCallback(
    (payload) => {
      dispatch(setOwnSelectedCity(payload));
    },
    [dispatch]
  );

  const handleInput = useCallback(
    (event) => {
      const name = event.target.value;
      const newOwnSelectedCity = { ...ownSelectedCity, name };
      updateOwnSelectedCity(newOwnSelectedCity);
    },
    [ownSelectedCity, updateOwnSelectedCity]
  );

  const handleBar = useCallback(
    (event) => {
      const barValue = parseFloat(event.target.value);
      const newOwnSelectedCity = { ...ownSelectedCity, weight: barValue };
      updateOwnSelectedCity(newOwnSelectedCity);
    },
    [ownSelectedCity, updateOwnSelectedCity]
  );

  const onSubmitAdd = useCallback(
    (e) => {
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
    },
    [isAuthenticated, ownSelectedCity, updateAddOwnCity, user]
  );

  const onSubmitRemove = useCallback(
    (e) => {
      e.preventDefault();

      if (!isAuthenticated) {
        // notify auth
      }
      const { email } = user;
      updateRemoveOwnCity({ email });
    },
    [isAuthenticated, updateRemoveOwnCity, user]
  );

  return { t, handleBar, handleInput, onSubmitAdd, onSubmitRemove };
};
