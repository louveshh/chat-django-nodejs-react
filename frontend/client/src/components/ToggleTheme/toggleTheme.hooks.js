import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from 'store/slices/toggle';

export const useToggleTheme = () => {
  const theme = useSelector((state) => state.toggle.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(changeTheme());
  };
  return { theme, handleToggle };
};
