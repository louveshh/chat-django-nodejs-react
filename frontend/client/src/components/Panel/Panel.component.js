import Baord from 'components/Board/Baord';
import PanelMap from 'components/PanelMap/PanelMap.component';
import PanelBoard from 'components/PanelBoard/PanelBoard.component';
import PanelCombo from 'components/PanelCombo/PanelCombo.component';
import Map from 'components/Map/Map.component';
import { RightPanel, MainPanel, LeftPanel, PanelWrapper } from './panel.styles';
import { usePanel } from './panel.hooks';

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
        {isMapActive && <PanelMap canvasRef={canvasRef} />}
        {isBoardActive && <PanelBoard />}
        {activeMode === 'combo' && <PanelCombo canvasRef={canvasRef} />}
      </RightPanel>
    </PanelWrapper>
  );
};
export default Panel;
