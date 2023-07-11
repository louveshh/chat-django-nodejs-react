import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { useTranslation } from 'react-i18next';

import {
  setToggleRunning,
  setAlgorithm,
  setClearBoard,
  setSelectedOption,
} from 'store/slices/board/board';
import { clearGrid } from 'utils/board/common/clearGrid.utils';
import { runAlgorithm } from 'utils/board/runAlgorithm.utils';
import { mode, configBoard } from 'config/config';

export const usePanelBoard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { points, grid, pathingInProgress, algorithm, toClear } = useSelector(
    (state) => state.board
  );
  const { activeMode } = useSelector((state) => state.toggle);

  const currentGrid = useMemo(() => cloneDeep(grid), [grid]);
  const currentPoints = useMemo(() => cloneDeep(points), [points]);

  const updateToggleRunning = useCallback(() => {
    dispatch(setToggleRunning());
  }, [dispatch]);

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );
  const updateClear = useCallback(
    (payload) => {
      dispatch(setClearBoard(payload));
    },
    [dispatch]
  );
  const updateSelectedOption = useCallback(
    (payload) => {
      dispatch(setSelectedOption(payload));
    },
    [dispatch]
  );
  const translateDefault = useMemo(
    () => ({
      label: t(`options.${configBoard.drawOptions[0].label}`),
      value: configBoard.drawOptions[0].value,
    }),
    [t]
  );

  const handleClearGrid = () => {
    updateClear(false);
    clearGrid(pathingInProgress, currentGrid);
    updateSelectedOption(translateDefault);
  };

  const handleAlgorithm = () => {
    updateClear(true);
    runAlgorithm(
      algorithm,
      pathingInProgress,
      currentGrid,
      currentPoints,
      updateToggleRunning
    );
    updateAlgorithm('');
  };

  const current = activeMode === mode.board;
  const clearing = !pathingInProgress && toClear && current;
  const active = !toClear && !pathingInProgress && current;
  const disabled = !algorithm || pathingInProgress || toClear;
  return {
    pathingInProgress,
    clearing,
    active,
    current,
    disabled,
    t,
    handleClearGrid,
    handleAlgorithm,
  };
};
