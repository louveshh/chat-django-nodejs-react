import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setSelectStartCity } from 'store/slices/map';
import cloneDeep from 'lodash/cloneDeep';

export const useSelectCity = () => {
  const [selectValue, setSelectValue] = useState();

  const { randomPoints, circlePoint, clickPossible } = useSelector(
    (state) => state.map
  );
  const { activeMode } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handleSelectCity = (event) => {
    setSelectValue(event);
    const { x, y } = event.value;
    dispatch(setSelectStartCity({ x, y }));
  };
  const selectValueData = () => {
    const data = cloneDeep(randomPoints);
    if (clickPossible) {
      data.unshift(circlePoint);
    }
    const dataTransfom = data.map(({ x, y, name }) => ({
      value: { x, y },
      label: name,
    }));
    return dataTransfom;
  };
  useEffect(() => {
    setSelectValue(null);
  }, [clickPossible]);
  return { selectValue, activeMode, selectValueData, handleSelectCity };
};
