import Node from '../Node/Node';
import { useBoard } from './board.hooks';

import { GridContainer, BoardWrapper } from './board.styles';

const Baord = ({ active }) => {
  const { grid, handleMouseDown } = useBoard();

  return (
    <BoardWrapper active={active}>
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
    </BoardWrapper>
  );
};

export default Baord;
