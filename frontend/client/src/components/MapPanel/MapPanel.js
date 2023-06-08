import { useMapPanel } from './mapPanel.hooks';
import { StyledButton } from '../Map/map.styles';
import { configMap } from '../../config/config';
import Click from '../Click/Click';
import SelectCity from '../SelectCity/SelectCity';
import SelectMapAlgorithm from '../SelectMapAlgorithm/SelectMapAlgorithm';
import WeightBar from '../WeightBar/WeightBar';

const MapPanel = ({ canvasRef }) => {
  const {
    toClear,
    pathingInProgress,
    activeMode,
    algorithm,
    clickPossible,
    handleAlgorithm,
    handleClear,
  } = useMapPanel(canvasRef);
  return (
    <div>
      {!toClear &&
        !pathingInProgress &&
        configMap.settings.includes(activeMode) && (
          <>
            {activeMode !== 'combo' && <SelectMapAlgorithm />}
            {activeMode !== 'combo' && algorithm && <Click />}
            {activeMode !== 'combo' && algorithm === 'tsg' && clickPossible && (
              <SelectCity />
            )}
            {activeMode !== 'combo' &&
              algorithm === 'sort' &&
              clickPossible && <WeightBar />}
            {algorithm && (
              <StyledButton type="button" onClick={handleAlgorithm()}>
                RUN ALGO
              </StyledButton>
            )}
          </>
        )}
      {!pathingInProgress && toClear && activeMode === 'map' && (
        <StyledButton type="button" className="button" onClick={handleClear}>
          CLEAR MAP
        </StyledButton>
      )}
    </div>
  );
};

export default MapPanel;
