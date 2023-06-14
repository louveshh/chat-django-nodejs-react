import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToggleActiveMode } from 'store/slices/toggle';
import {
  setClickPossible,
  setRandomPointsZero,
  setZeroStartCity,
  setAlgorithm as setAlgorithmMap,
  setCirclePoint,
  setZeroStartCityFiltered,
} from 'store/slices/map';
import {
  setAlgorithm as setAlgorithmBoard,
  setSelectedOption,
} from 'store/slices/board';
import { configBoard } from 'config/config';
import { addBorders } from 'utils/board/common/addBorders.util';

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

  const updateToggleActiveMode = useCallback(
    (payload) => {
      dispatch(setToggleActiveMode(payload));
    },
    [dispatch]
  );
  const updateClickPossible = useCallback(
    (payload) => {
      dispatch(setClickPossible(payload));
    },
    [dispatch]
  );
  const updateRandomPointsZero = useCallback(() => {
    dispatch(setRandomPointsZero());
  }, [dispatch]);

  const updateZeroStartCity = useCallback(() => {
    dispatch(setZeroStartCity());
  }, [dispatch]);

  const updateZeroStartCityFiltered = useCallback(() => {
    dispatch(setZeroStartCityFiltered());
  }, [dispatch]);

  const updateAlgorithmMap = useCallback(
    (payload) => {
      dispatch(setAlgorithmMap(payload));
    },
    [dispatch]
  );

  const updateAlgorithmBoard = useCallback(
    (payload) => {
      dispatch(setAlgorithmBoard(payload));
    },
    [dispatch]
  );

  const updateCirclePoint = useCallback(
    (payload) => {
      dispatch(setCirclePoint(payload));
    },
    [dispatch]
  );

  const handleToggle = (buttonId) => {
    addBorders();
    updateToggleActiveMode(buttonId);
    updateClickPossible(false);
    updateRandomPointsZero();
    updateZeroStartCity();
    updateZeroStartCityFiltered();
    updateAlgorithmMap(null);
    updateAlgorithmBoard(null);
    updateSelectedOption(configBoard.defaultDrawOption);
    updateCirclePoint({ ...circlePoint, weight: 0 });
  };
  return { activeMode, handleToggle };
};
