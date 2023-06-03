import { useSelector, useDispatch } from 'react-redux';
import { toggleActiveMode } from 'store/slices/toggle';
import { setClickPossible } from 'store/slices/map';

export const useToggleMode = () => {
  const activeMode = useSelector((state) => state.toggle.activeMode);
  const dispatch = useDispatch();

  const handleToggle = (buttonId) => {
    dispatch(toggleActiveMode(buttonId));
    dispatch(setClickPossible(false));
  };
  return { activeMode, handleToggle };
};
