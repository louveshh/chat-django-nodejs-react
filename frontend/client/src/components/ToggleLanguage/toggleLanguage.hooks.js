import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from 'store/slices/toggle';
import i18n from './../../i18n/i18n';

export const useToggleLangauge = () => {
  const language = useSelector((state) => state.toggle.language);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(changeLanguage());
    i18n.changeLanguage(language);
  };
  return { language, handleToggle };
};
