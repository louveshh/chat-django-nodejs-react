import { usePanelMap } from './panelMap.hooks';
import { StyledButton } from '../Map/map.styles';
import Click from '../ToggleClick/ToggleClick.component';
import SelectCity from '../SelectCity/SelectCity.component';
import SelectMapAlgorithm from '../SelectMapAlgorithm/SelectMapAlgorithm';
import BarWeight from '../BarWeight/BarWeight.component';

const PanelMap = ({ canvasRef }) => {
  const {
    toClear,
    pathingInProgress,
    activeMode,
    algorithm,
    clickPossible,
    handleAlgorithm,
    handleClear,
  } = usePanelMap(canvasRef);
  return (
    <>
      {!toClear && !pathingInProgress && activeMode === 'map' && (
        <>
          <SelectMapAlgorithm />
          {algorithm && <Click />}
          {algorithm === 'tsg' && clickPossible && <SelectCity />}
          {algorithm === 'sort' && clickPossible && <BarWeight />}
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
    </>
  );
};

export default PanelMap;
