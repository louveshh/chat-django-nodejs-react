import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm } from 'store/slices/board';

export const useSelectBoardAlgorithm = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );

  const handleSelectBoardAlgorithm = (event) => {
    updateAlgorithm(event.value);
  };
  return { activeMode, handleSelectBoardAlgorithm };
};
