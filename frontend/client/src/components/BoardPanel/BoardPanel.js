import { useBoardPanel } from './boardPanel.hooks';
import { configBoard } from '../../config/config';
import { ButtonsWrapper, StyledSelect } from './boardPanel.styles';
import SelectBoardAlgorithm from '../SelectBoardAlgorithm/SelectBoardAlgorithm';

const BoardPanel = () => {
  const {
    pathingInProgress,
    selectedOption,
    activeMode,
    algorithm,
    toClear,
    handleClearGrid,
    handleAlgorithm,
    updateSelectedOption,
  } = useBoardPanel();
  return (
    <ButtonsWrapper>
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
            placeholder="?"
          />
        </>
      )}

      {!pathingInProgress && algorithm && activeMode === 'board' && (
        <button type="button" onClick={() => handleAlgorithm()}>
          runAlgorithm
        </button>
      )}
    </ButtonsWrapper>
  );
};

export default BoardPanel;
