import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectStartCity } from 'store/slices/map/map';
import cloneDeep from 'lodash/cloneDeep';

export const useSelectCity = () => {
  const { cityPoints, ownSelectedCity, clickPossible } = useSelector(
    (state) => state.map
  );
  const dispatch = useDispatch();

  const selectValueData = useMemo(() => {
    const data = cloneDeep(cityPoints);
    if (clickPossible) {
      data.unshift(ownSelectedCity);
    }
    const dataTransfom = data.map(({ x, y, name }) => ({
      value: { x, y },
      label: name,
    }));
    return dataTransfom;
  }, [ownSelectedCity, clickPossible, cityPoints]);

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
