import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCirclePoint } from 'store/slices/map';

export const useWeightBar = () => {
  const [weightBar, setWeightBar] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const { circlePoint } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const handleClick = () => {
    setWeightBar((prev) => !prev);
    const newCirclePoint = { ...circlePoint, weight: 0 };
    dispatch(setCirclePoint(newCirclePoint));
  };
  const handleBar = (event) => {
    const barValue = parseFloat(event.target.value);
    if (barValue <= 1) {
      setInputValue(-Infinity);
    } else if (barValue >= 49) {
      setInputValue(Infinity);
    } else {
      setInputValue(barValue);
    }
    const newCirclePoint = { ...circlePoint, weight: inputValue };
    dispatch(setCirclePoint(newCirclePoint));
  };
  return { weightBar, inputValue, handleClick, handleBar };
};
