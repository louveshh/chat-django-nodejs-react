import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logout } from 'store/slices/user';
import { configPaths } from 'config/paths';

export const useNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const updateLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onClick = () => {
    updateLogout();
    navigate(configPaths.home);
  };

  const location = useLocation();

  const isActive = (payload) => location.pathname === payload;
  return { isAuthenticated, isActive, t, onClick };
};
