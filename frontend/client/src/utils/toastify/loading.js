import { toast } from 'react-toastify';

export class LoadingManager {
  constructor({ render, position = 'bottom-center' }) {
    this.id = toast.loading(render, { position });
  }

  updateLoading({
    render,
    type,
    isLoading,
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    position = 'bottom-center',
  }) {
    toast.update(this.id, {
      render,
      type,
      isLoading,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      position,
    });
  }
}
