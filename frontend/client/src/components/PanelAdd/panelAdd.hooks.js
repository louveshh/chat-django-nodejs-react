import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setAddOwnCity, setEditOwnCity } from 'store/slices/map';

export const usePanelAdd = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const updatAddOwnCity = useCallback(() => {
    dispatch(setAddOwnCity());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    updatAddOwnCity({ email, x, y });
  };

  return { t };
};
