import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCirclePoint } from 'store/slices/map';
import { useTranslation } from 'react-i18next';

export const useBarWeight = () => {
  const [weightBar, setWeightBar] = useState(false);
  const { circlePoint } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    setWeightBar((prev) => !prev);
    const newCirclePoint = { ...circlePoint, weight: 0 };
    dispatch(setCirclePoint(newCirclePoint));
  };

  const updateCirclePoint = useCallback(
    (payload) => {
      dispatch(setCirclePoint(payload));
    },
    [dispatch]
  );

  const handleBar = (event) => {
    const barValue = parseFloat(event.target.value);
    let newBarValue = barValue;
    if (barValue <= 1) {
      newBarValue = -Infinity;
    } else if (barValue >= 49) {
      newBarValue = Infinity;
    }
    const newCirclePoint = { ...circlePoint, weight: newBarValue };
    updateCirclePoint(newCirclePoint);
  };
  return { weightBar, t, handleClick, handleBar };
};
