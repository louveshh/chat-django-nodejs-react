import { useBoardPanel } from './boardPanel.hooks';
import { configBoard } from '../../config/config';
import { ButtonsWrapper, StyledSelect } from './boardPanel.styles';
import SelectBoardAlgorithm from './../SelectBoardAlgorithm/SelectBoardAlgorithm';

const BoardPanel = () => {
  const {
    isRunning,
    selectedOption,
    activeMode,
    algorithm,
    handleClearGrid,
    handleAlgorithm,
    updateSelectedOption,
  } = useBoardPanel();
  return (
    <ButtonsWrapper>
      {!isRunning && activeMode === 'board' && (
        <button type="button" onClick={handleClearGrid}>
          Clear Grid
        </button>
      )}
      {!isRunning && activeMode === 'board' && <SelectBoardAlgorithm />}
      {activeMode === 'board' && !isRunning && (
        <StyledSelect
          onChange={updateSelectedOption}
          value={selectedOption}
          options={configBoard.drawOptions}
          placeholder="?"
        />
      )}

      {!isRunning && algorithm && activeMode === 'board' && (
        <button type="button" onClick={() => handleAlgorithm()}>
          runAlgorithm
        </button>
      )}
    </ButtonsWrapper>
  );
};

export default BoardPanel;
