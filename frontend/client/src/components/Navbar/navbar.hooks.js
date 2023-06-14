import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from 'store/slices/user';

export const useNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const updateLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const onClick = () => {
    updateLogout();
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };
  return { isAuthenticated, onClick };
};
