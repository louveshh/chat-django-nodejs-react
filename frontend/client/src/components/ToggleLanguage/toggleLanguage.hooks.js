import { useSelector, useDispatch } from 'react-redux';
import { setChangeLanguage } from 'store/slices/toggle/toggle';
import i18n from 'i18next';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useToggleLangauge = () => {
  const language = useSelector((state) => state.toggle.language);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateChangeLanguage = useCallback(() => {
    dispatch(setChangeLanguage());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(language);
    return () => {};
  }, [language]);
  const handleToggle = () => {
    updateChangeLanguage();
  };
  return { t, language, handleToggle };
};
