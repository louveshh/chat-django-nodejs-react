import { StyledLoading } from './commonButton.styles';

export const renderLoading = () => {
  const spans = [];

  for (let i = 0; i < 4; i++) {
    spans.push(<StyledLoading key={i} />);
  }

  return spans;
};
