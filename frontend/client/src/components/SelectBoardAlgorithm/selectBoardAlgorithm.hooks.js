import { useDispatch, useSelector } from 'react-redux';
import { setAlgorithm } from 'store/slices/board';

export const useSelectBoardAlgorithm = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handleSelectBoardAlgorithm = (event) => {
    dispatch(setAlgorithm(event.value));
  };
  return { activeMode, handleSelectBoardAlgorithm };
};
