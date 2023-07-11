import PanelMap from 'components/PanelMap/PanelMap.component';
import PanelBoard from 'components/PanelBoard/PanelBoard.component';
import PanelCombo from 'components/PanelCombo/PanelCombo.component';
import PanelDescription from 'components/PanelDescription/PanelDescription.component';
import PanelAdd from 'components/PanelAdd/PanelAdd.component';
import Map from 'components/Map/Map.component';
import Baord from 'components/Board/Baord.component';
import { RightPanel, MainPanel, LeftPanel, PanelWrapper } from './panel.styles';
import { usePanel } from './panel.hooks';

const Panel = () => {
  const { canvasRef, isMapActive, isBoardActive, isComboActive, isAddActive } =
    usePanel();
  return (
    <PanelWrapper>
      <LeftPanel>
        <PanelDescription />
      </LeftPanel>
      <MainPanel>
        <Map canvasRef={canvasRef} active={isMapActive} />
        <Baord active={isBoardActive} />
      </MainPanel>
      <RightPanel>
        {isMapActive && <PanelMap canvasRef={canvasRef} />}
        {isBoardActive && <PanelBoard />}
        {isComboActive && <PanelCombo canvasRef={canvasRef} />}
        {isAddActive && <PanelAdd />}
      </RightPanel>
    </PanelWrapper>
  );
};
export default Panel;
