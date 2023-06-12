import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setAlgorithm } from 'store/slices/board';
import { translateOptions } from 'utils/common/translateOptions';
import { configBoard } from 'config/config';
import { useTranslation } from 'react-i18next';

export const useSelectBoardAlgorithm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = useMemo(() => translateOptions(t, configBoard.algorithmOptions), [t]);

  const updateAlgorithm = useCallback(
    (payload) => {
      dispatch(setAlgorithm(payload));
    },
    [dispatch]
  );

  const handleSelectBoardAlgorithm = (event) => {
    updateAlgorithm(event.value);
  };

  return { options, handleSelectBoardAlgorithm };
};
