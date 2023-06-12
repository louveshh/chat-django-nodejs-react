import { usePanelBoard } from './panelBoard.hooks';
import { configBoard } from '../../config/config';
import { StyledSelect } from './panelBoard.styles';
import SelectBoardAlgorithm from '../SelectBoardAlgorithm/SelectBoardAlgorithm.component';

const PanelBoard = () => {
  const {
    pathingInProgress,
    selectedOption,
    activeMode,
    algorithm,
    toClear,
    handleClearGrid,
    handleAlgorithm,
    updateSelectedOption,
  } = usePanelBoard();
  return (
    <>
      {!pathingInProgress && toClear && activeMode === 'board' && (
        <button type="button" onClick={handleClearGrid}>
          Clear Grid
        </button>
      )}
      {!toClear && !pathingInProgress && activeMode === 'board' && (
        <>
          <SelectBoardAlgorithm />
          <StyledSelect
            onChange={updateSelectedOption}
            value={selectedOption}
            options={configBoard.drawOptions}
          />
        </>
      )}

      {!pathingInProgress && algorithm && activeMode === 'board' && (
        <button type="button" onClick={() => handleAlgorithm()}>
          runAlgorithm
        </button>
      )}
    </>
  );
};

export default PanelBoard;
