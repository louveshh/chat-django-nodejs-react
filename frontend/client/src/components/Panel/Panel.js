import Baord from 'components/Board/Baord';
import MapPanel from 'components/MapPanel/MapPanel';
import { RightPanel, MainPanel, LeftPanel, PanelWrapper } from './panel.styles';
import Map from '../Map/Map';
import { usePanel } from './panel.hooks';
import BoardPanel from '../BoardPanel/BoardPanel';

const Panel = () => {
  const { canvasRef } = usePanel();
  return (
    <PanelWrapper>
      <LeftPanel>xd</LeftPanel>
      <MainPanel>
        <Map canvasRef={canvasRef} />
        <Baord />
      </MainPanel>
      <RightPanel>
        <MapPanel canvasRef={canvasRef} />
        <BoardPanel />
      </RightPanel>
    </PanelWrapper>
  );
};
export default Panel;