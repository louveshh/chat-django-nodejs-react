import { useCallback } from 'react';

import { warningManager } from 'utils/toastify/warning';
import { StyledLoading } from './commonButton.styles';

export const useCommonButton = (onClick, disabled) => {
  const renderLoading = useCallback(() => {
    const spans = [];

    for (let i = 0; i < 4; i++) {
      spans.push(<StyledLoading key={i} />);
    }
    return spans;
  }, []);

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    if (disabled) {
      warningManager({ render: 'Button conditions - not met' });
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return { handleClick, renderLoading };
};
