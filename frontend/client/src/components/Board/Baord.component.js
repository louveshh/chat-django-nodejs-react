import Node from 'components/Node/Node.component';
import { useBoard } from './board.hooks';
import { GridContainer } from './board.styles';

const Baord = ({ active }) => {
  const { grid, handleMouseDown } = useBoard();
  return (
    <GridContainer active={active}>
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
  );
};

export default Baord;
