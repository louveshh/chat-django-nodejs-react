import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleActiveMode } from 'store/slices/toggle';
import {
  setClickPossible,
  setRandomPointsZero,
  setZeroStartCity,
  setAlgorithm,
  setCirclePoint,
  setZeroStartCityFiltered,
} from 'store/slices/map';
import { setAlgorithm as setAlgorithmBoard, setSelectedOption } from 'store/slices/board';
import { configBoard } from '../../config/config';
import { addBorders } from '../../utils/board/common/addBorders.util';

export const useToggleMode = () => {
  const { circlePoint } = useSelector((state) => state.map);
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const updateSelectedOption = useCallback(
    (payload) => {
      dispatch(setSelectedOption(payload));
    },
    [dispatch]
  );

  const handleToggle = (buttonId) => {
    addBorders();
    dispatch(setToggleActiveMode(buttonId));
    dispatch(setClickPossible(false));
    dispatch(setRandomPointsZero());
    dispatch(setZeroStartCity());
    dispatch(setZeroStartCityFiltered());
    dispatch(setAlgorithm(null));
    dispatch(setAlgorithmBoard(null));
    updateSelectedOption(configBoard.defaultDrawOption);
    dispatch(setCirclePoint({ ...circlePoint, weight: 0 }));
  };
  return { activeMode, handleToggle };
};
