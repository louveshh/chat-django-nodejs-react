import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from 'store/slices/toggle';
import i18n from 'i18next';
import { useEffect } from 'react';

export const useToggleLangauge = () => {
  const language = useSelector((state) => state.toggle.language);
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  const handleToggle = () => {
    dispatch(changeLanguage());
  };
  return { language, handleToggle };
};
