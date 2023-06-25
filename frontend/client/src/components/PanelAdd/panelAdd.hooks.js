import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setAddOwnCity } from 'store/slices/map';

export const usePanelAdd = () => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ownSelectedCity } = useSelector((state) => state.map);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const updatAddOwnCity = useCallback(
    (payload) => {
      dispatch(setAddOwnCity(payload));
    },
    [dispatch]
  );
  const handleBar = (event) => {
    const barValue = parseFloat(event.target.value);
    setWeight(barValue);
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
    const { x, y } = ownSelectedCity;
    updatAddOwnCity({ email, x, y, name, weight });
  };

  return { t, handleBar, onSubmit };
};
