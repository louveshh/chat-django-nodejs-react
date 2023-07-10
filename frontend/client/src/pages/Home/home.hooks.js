import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    if (!isAuthenticated && !loading) {
      return navigate('/login');
    }
    return () => {};
  }, [isAuthenticated, loading, navigate]);

  return { user, t };
};
