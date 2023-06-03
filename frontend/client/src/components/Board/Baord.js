import Node from '../Node/Node';
import { useBoard } from './board.hooks';

import { configBoard } from '../../config/config';
import {
  ButtonsWrapper,
  StyledSelect,
  GridContainer,
  BoardWrapper,
} from './board.styles';
import { configView } from './../../config/config';

const Baord = () => {
  const {
    grid,
    handleMouseDown,
    handleClearGrid,
    handleAlgorithm,
    selectedOption,
    handleChange,
    activeMode,
  } = useBoard();

  return (
    <BoardWrapper active={configView.boardModes.includes(activeMode)}>
      <GridContainer>
        {grid &&
          [].concat(...grid)?.map((node, nodeIdx) => {
            const { row, col, isFinish, isStart, isWall } = node;
            return (
              <Node
                key={`${row}-${col}-key`}
                col={col}
                row={row}
                isFinish={isFinish}
                isStart={isStart}
                isWall={isWall}
                onMouseDown={(row, col) => handleMouseDown(row, col)}
              >
                {nodeIdx}
              </Node>
            );
          })}
      </GridContainer>
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
          />
        )}
      </ButtonsWrapper>
    </BoardWrapper>
  );
};

export default Baord;
