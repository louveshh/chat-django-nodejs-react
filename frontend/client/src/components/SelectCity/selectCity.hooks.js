import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectStartCity } from 'store/slices/map';
import cloneDeep from 'lodash/cloneDeep';

export const useSelectCity = () => {
  const { randomPoints, circlePoint, clickPossible } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const selectValueData = useMemo(() => {
    const data = cloneDeep(randomPoints);
    if (clickPossible) {
      data.unshift(circlePoint);
    }
    const dataTransfom = data.map(({ x, y, name }) => ({
      value: { x, y },
      label: name,
    }));
    return dataTransfom;
  }, [circlePoint, clickPossible, randomPoints]);

  const updateSelectStartCity = useCallback(
    (payload) => {
      dispatch(setSelectStartCity(payload));
    },
    [dispatch]
  );

  const handleSelectCity = (event) => {
    const { x, y } = event.value;
    updateSelectStartCity({ x, y });
  };

  return { selectValueData, handleSelectCity };
};
