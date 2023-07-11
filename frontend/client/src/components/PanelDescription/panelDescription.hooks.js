import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import translationsEN from 'i18n/locales/en.json';
import translationsPL from 'i18n/locales/pl.json';
import { StyledLi } from './panelDescription.styles';

export const usePanelDiscription = () => {
  const { activeMode } = useSelector((state) => state.toggle);
  const { i18n } = useTranslation();
  const { panelDescriptions } =
    i18n.language === 'en' ? translationsEN : translationsPL;

  const texts = Object.entries(
    panelDescriptions[activeMode] ? panelDescriptions[activeMode] : []
  )?.map(([key, value]) => <StyledLi key={key}>{value}</StyledLi>);
  return { texts };
};
