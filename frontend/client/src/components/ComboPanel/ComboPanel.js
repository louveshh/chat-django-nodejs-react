import { useComboPanel } from './comboPanel.hooks';
import { StyledButton } from './comboPanel.styles';
import { MultiSelectSort } from '../SortableMultiSelect/SortableMultiSelectSort';

const ComboPanel = ({ canvasRef }) => {
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
  } = useComboPanel(canvasRef);
  return (
    <div>
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        mapToClear &&
        activeMode === 'combo' && (
          <button type="button" onClick={handleClearMap}>
            Clear Map
          </button>
        )}
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        boardToClear &&
        activeMode === 'combo' && (
          <button type="button" onClick={() => handleClearBoard(false)}>
            Clear Board
          </button>
        )}
      {!(
        mapPathingInProgress ||
        mapToClear ||
        boardToClear ||
        boardPathingInProgress
      ) && (
        <>
          <MultiSelectSort />
          {filteredCities.length >= 2 && (
            <StyledButton type="button" onClick={handleAlgorithm}>
              RUN ALGO
            </StyledButton>
          )}
        </>
      )}
    </div>
  );
};

export default ComboPanel;
