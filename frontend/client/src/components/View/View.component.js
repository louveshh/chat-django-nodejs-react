import 'react-toggle/style.css';
import Board from '../../components/Board/Baord';
import { useView } from './view.hooks';
import { configView } from '../../config/config';
import { ViewContainer, PanelWrapper } from './view.styles';
import Map from '../Map/Map';
import ToggleMode from '../ToggleMode/ToggleMode.component';

const View = () => {
  const { activeMode } = useView();
  return (
    <ViewContainer>
      <ToggleMode />
      <PanelWrapper>
        {configView.mapModes.includes(activeMode) && <Map />}
        {configView.boardModes.includes(activeMode) && <Board />}
      </PanelWrapper>
    </ViewContainer>
  );
};

export default View;
