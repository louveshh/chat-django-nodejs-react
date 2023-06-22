import { usePanelDiscription } from './panelDescription.hooks';
import { StyledUl } from './panelDescription.styles';

const PanelDescription = () => {
  const { texts } = usePanelDiscription();
  return <StyledUl>{texts}</StyledUl>;
};

export default PanelDescription;
