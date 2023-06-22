import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setSelectedOption } from 'store/slices/board';
import { translateOptions } from 'utils/common/translateOptions';
import { configBoard } from 'config/config';

export const useSelectBoardDraw = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { selectedOption } = useSelector((state) => state.board);

  const updateSelectedOption = useCallback(
    (payload) => {
      dispatch(setSelectedOption(payload));
    },
    [dispatch]
  );

  const options = useMemo(
    () => translateOptions(t, configBoard.drawOptions),
    [t]
  );
  const translateDefault = useMemo(
    () => ({
      label: t(`options.${configBoard.drawOptions[0].label}`),
      value: configBoard.drawOptions[0].value,
    }),
    [t]
  );

  return {
    selectedOption,
    options,
    translateDefault,
    updateSelectedOption,
  };
};
