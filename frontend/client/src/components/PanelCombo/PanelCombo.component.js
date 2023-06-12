import { usePanelCombo } from './panelCombo.hooks';
import { StyledButton } from './panelCombo.styles';
import { MultiSelectSort } from '../SortableMultiSelect/SortableMultiSelectSort';
import { mode } from '../../config/config';

const PanelCombo = ({ canvasRef }) => {
  const {
    mapToClear,
    mapPathingInProgress,
    boardToClear,
    boardPathingInProgress,
    activeMode,
    filteredCities,
    handleAlgorithm,
    handleClearMap,
    handleClearBoard,
  } = usePanelCombo(canvasRef);
  return (
    <>
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        mapToClear &&
        activeMode === mode.combo && (
          <button type="button" onClick={handleClearMap}>
            Clear Map
          </button>
        )}
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        boardToClear &&
        activeMode === mode.combo && (
          <button type="button" onClick={() => handleClearBoard(false)}>
            Clear Board
          </button>
        )}
      {!(mapPathingInProgress || mapToClear || boardToClear || boardPathingInProgress) && (
        <>
          {filteredCities.length >= 2 && (
            <StyledButton type="button" onClick={handleAlgorithm}>
              RUN ALGO
            </StyledButton>
          )}
          <MultiSelectSort />
        </>
      )}
    </>
  );
};

export default PanelCombo;
