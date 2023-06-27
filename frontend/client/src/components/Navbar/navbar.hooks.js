import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logout } from 'store/slices/user';
import { configPaths } from 'config/paths';

export const useNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuthenticated } = useSelector((state) => state.user);

  const updateLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onClick = () => {
    updateLogout();
    setTimeout(() => {
      navigate(configPaths.home);
    }, 3000);
  };

  const location = useLocation();
  console.log(location);

  const isActive = (payload) => {
    console.log(payload, location.pathname);
    return location.pathname === payload;
  };
  return { isAuthenticated, isActive, t, onClick };
};
