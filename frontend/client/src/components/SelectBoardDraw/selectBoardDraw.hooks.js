import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedOption } from '../../store/slices/board';

export const useSelectBoardDraw = () => {
  const dispatch = useDispatch();

  const { selectedOption } = useSelector((state) => state.board);

  const updateSelectedOption = useCallback(
    (payload) => {
      dispatch(setSelectedOption(payload));
    },
    [dispatch]
  );
  return {
    selectedOption,
    updateSelectedOption,
  };
};
