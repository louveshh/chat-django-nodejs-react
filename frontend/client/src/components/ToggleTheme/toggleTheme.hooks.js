import { useSelector, useDispatch } from 'react-redux';
import { setChangeTheme } from 'store/slices/toggle';

export const useToggleTheme = () => {
  const theme = useSelector((state) => state.toggle.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setChangeTheme());
  };
  return { theme, handleToggle };
};
