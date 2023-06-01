import { useSelector, useDispatch } from 'react-redux';
import { toggleActiveMode } from 'store/slices/toggle';

export const useToggleMode = () => {
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const handleToggle = (buttonId) => {
    dispatch(toggleActiveMode(buttonId));
  };
  return { activeMode, handleToggle };
};
