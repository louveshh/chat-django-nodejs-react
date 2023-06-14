import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { mode } from 'config/config';
import { usePanelCombo } from './panelCombo.hooks';
import { MultiSelectSort } from '../SortableMultiSelect/SortableMultiSelectSort.component';

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
      <CommonButton
        type="button"
        onClick={handleAlgorithm}
        disabled={filteredCities.length < 2 || mapToClear || boardToClear}
        pathingInProgress={mapPathingInProgress || boardPathingInProgress}
      >
        RUN
      </CommonButton>
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        mapToClear &&
        activeMode === mode.combo && (
          <CommonButton type="button" onClick={handleClearMap}>
            Clear Map
          </CommonButton>
        )}
      {!boardPathingInProgress &&
        !mapPathingInProgress &&
        boardToClear &&
        activeMode === mode.combo && (
          <CommonButton type="button" onClick={() => handleClearBoard(false)}>
            Clear Board
          </CommonButton>
        )}
      {!(mapPathingInProgress || mapToClear || boardToClear || boardPathingInProgress) && (
        <MultiSelectSort />
      )}
    </>
  );
};

export default PanelCombo;
