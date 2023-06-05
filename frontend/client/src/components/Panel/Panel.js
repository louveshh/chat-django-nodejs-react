import Baord from 'components/Board/Baord';
import MapPanel from 'components/MapPanel/MapPanel';
import { RightPanel, MainPanel, LeftPanel, PanelWrapper } from './panel.styles';
import Map from '../Map/Map';
import { usePanel } from './panel.hooks';
import BoardPanel from '../BoardPanel/BoardPanel';
import ComboPanel from '../ComboPanel/ComboPanel';

const Panel = () => {
  const { canvasRef, isMapActive, isBoardActive, activeMode } = usePanel();
  return (
    <PanelWrapper>
      <LeftPanel>xd</LeftPanel>
      <MainPanel>
        <Map canvasRef={canvasRef} active={isMapActive} />
        <Baord active={isBoardActive} />
      </MainPanel>
      <RightPanel>
        {isMapActive && <MapPanel canvasRef={canvasRef} />}
        {isBoardActive && <BoardPanel />}
        {activeMode === 'combo' && <ComboPanel canvasRef={canvasRef} />}
      </RightPanel>
    </PanelWrapper>
  );
};
export default Panel;
