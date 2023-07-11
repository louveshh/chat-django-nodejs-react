import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMap } from 'store/slices/map/mapAsync';
import { checkAuth } from 'store/slices/user/userAsync';

export const useModes = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const updateMap = useCallback(() => {
    dispatch(getMap());
  }, [dispatch]);

  const updateCheckAuth = useCallback(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    updateMap();
    if (isAuthenticated) {
      return;
    }
    updateCheckAuth();
  }, [isAuthenticated, updateCheckAuth, updateMap]);
};
