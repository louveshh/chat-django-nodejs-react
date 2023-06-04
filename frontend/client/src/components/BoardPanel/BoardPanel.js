import { useBoardPanel } from './boardPanel.hooks';

import { configBoard } from '../../config/config';
import { ButtonsWrapper, StyledSelect } from './boardPanel.styles';

const BoardPanel = () => {
  const {
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
  } = useBoardPanel();
  return (
    <ButtonsWrapper>
      <button type="button" onClick={handleClearGrid}>
        Clear Grid
      </button>
      <button type="button" onClick={() => handleAlgorithm('Dijkstra')}>
        Dijkstra's
      </button>
      <button type="button" onClick={() => handleAlgorithm('AStar')}>
        A*
      </button>
      <button type="button" onClick={() => handleAlgorithm('BFS')}>
        Bread First Search
      </button>
      <button type="button" onClick={() => handleAlgorithm('DFS')}>
        Depth First Search
      </button>
      {activeMode === 'board' && (
        <StyledSelect
          onChange={handleChange}
          value={selectedOption}
          options={configBoard.drawOptions}
          placeholder="?"
        />
      )}
    </ButtonsWrapper>
  );
};

export default BoardPanel;
