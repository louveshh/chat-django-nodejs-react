import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm, setRandomPointsZero, setZeroStartCity, setClickPossible } from 'store/slices/map';

export const useSelectMapAlgorithm = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handleAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );
  const handleRandomPointsZero = useCallback(() => {
    dispatch(setRandomPointsZero());
  }, [dispatch]);
  const handleZeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);
  const handleClickPossible = useCallback(
    (payload) => {
      dispatch(setClickPossible(payload));
    },
    [dispatch]
  );

  const handleSelectMapAlgorithm = (event) => {
    handleAlgorithm(event.value);
    handleRandomPointsZero();
    handleZeroStartCity();
    handleClickPossible(false);
  };
  return { activeMode, handleSelectMapAlgorithm };
};
