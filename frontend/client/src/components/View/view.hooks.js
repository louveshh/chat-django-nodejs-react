import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMap } from 'store/slices/map';

export const useView = () => {
  const dispatch = useDispatch();
  const updateMap = () => {
    dispatch(getMap());
  };
  useEffect(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
