import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'store/slices/user/userAsync';

export const useHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  const updateUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        updateUser();
      }
    }, 2500);
  }, [dispatch, updateUser, user]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      return navigate('/login');
    }
    return () => {};
  }, [isAuthenticated, loading, navigate]);

  return { user, t };
};
