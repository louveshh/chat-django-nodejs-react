import { toast } from 'react-toastify';

export const warningManager = ({
  render,
  type,
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  position = 'bottom-center',
}) => {
  toast.warn(render, {
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    position,
    type,
  });
};
