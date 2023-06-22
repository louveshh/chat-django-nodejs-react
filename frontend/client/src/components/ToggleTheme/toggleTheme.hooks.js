import { useSelector, useDispatch } from 'react-redux';
import { setChangeTheme } from 'store/slices/toggle';
import { useTranslation } from 'react-i18next';

export const useToggleTheme = () => {
  const theme = useSelector((state) => state.toggle.theme);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleToggle = () => {
    dispatch(setChangeTheme());
  };
  return { theme, t, handleToggle };
};
