import { useMapPanel } from './mapPanel.hooks';
import { StyledButton } from '../Map/map.styles';
import { configMap } from '../../config/config';
import Click from '../Click/Click';
import SelectCity from '../SelectCity/SelectCity';

const MapPanel = ({ canvasRef }) => {
  const {
    toClear,
    pathingInProgress,
    activeMode,
    handleTSGClick,
    handleSortClick,
    handleDateClick,
    handleRandomClick,
    handleClear,
  } = useMapPanel(canvasRef);
  return (
    <div>
      {!toClear && configMap.settings.includes(activeMode) && (
        <>
          <StyledButton
            type="button"
            className="button"
            onClick={handleTSGClick}
          >
            TSG alg
          </StyledButton>
          <StyledButton
            type="button"
            className="button"
            onClick={handleSortClick}
          >
            Sort alg
          </StyledButton>
          <StyledButton
            type="button"
            className="button"
            onClick={handleDateClick}
          >
            Date alg
          </StyledButton>
          <StyledButton
            type="button"
            className="button"
            onClick={handleRandomClick}
          >
            Random alg
          </StyledButton>
          {activeMode !== 'combo' && <Click />}
          {activeMode !== 'combo' && <SelectCity />}
        </>
      )}
      {!pathingInProgress &&
        toClear &&
        configMap.clearButton.includes(activeMode) && (
          <StyledButton type="button" className="button" onClick={handleClear}>
            CLEAR
          </StyledButton>
        )}
    </div>
  );
};

export default MapPanel;
