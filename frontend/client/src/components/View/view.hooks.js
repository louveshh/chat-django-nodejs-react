import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMap } from 'store/slices/map';

export const useView = () => {
  const activeMode = useSelector((state) => state.toggle.activeMode);

  return { activeMode };
};
