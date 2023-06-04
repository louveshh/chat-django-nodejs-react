import { useBoardPanel } from './boardPanel.hooks';

import { configBoard } from '../../config/config';
import { ButtonsWrapper, StyledSelect } from './boardPanel.styles';
import SelectBoardAlgorithm from './../SelectBoardAlgorithm/SelectBoardAlgorithm';

const BoardPanel = () => {
  const {
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
    isRunning,
    algorithm,
  } = useBoardPanel();
  return (
    <ButtonsWrapper>
      {!isRunning && (
        <button type="button" onClick={handleClearGrid}>
          Clear Grid
        </button>
      )}
      {!isRunning && <SelectBoardAlgorithm />}
      {activeMode === 'board' && !algorithm && !isRunning && (
        <StyledSelect
          onChange={handleChange}
          value={selectedOption}
          options={configBoard.drawOptions}
          placeholder="?"
        />
      )}

      {!isRunning && algorithm && (
        <button type="button" onClick={() => handleAlgorithm()}>
          runAlgorithm
        </button>
      )}
    </ButtonsWrapper>
  );
};

export default BoardPanel;
