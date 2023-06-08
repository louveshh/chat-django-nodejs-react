import { useSelector, useDispatch } from 'react-redux';
import { setChangeLanguage } from 'store/slices/toggle';
import i18n from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useToggleLangauge = () => {
  const language = useSelector((state) => state.toggle.language);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const handleToggle = () => {
    dispatch(setChangeLanguage());
  };
  return { t, language, handleToggle };
};
