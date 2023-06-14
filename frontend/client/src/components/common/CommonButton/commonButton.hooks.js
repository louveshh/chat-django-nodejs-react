import { useCallback } from 'react';
import { StyledLoading } from './commonButton.styles';

export const useCommonButton = (onClick) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  const renderLoading = useCallback(() => {
    const spans = [];

    for (let i = 0; i < 4; i++) {
      spans.push(<StyledLoading key={i} />);
    }
    return spans;
  }, []);

  return { handleClick, renderLoading };
};
