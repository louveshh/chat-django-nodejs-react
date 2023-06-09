import './node.styles.css';
import { configDisplay } from 'config/config';
import { useNode } from './node.hooks';

const Node = ({ col, row, isFinish, isStart, isWall, onMouseDown }) => {
  const { extraClassName, extraNodeBorder } = useNode(
    isFinish,
    isStart,
    isWall
  );
  return (
    <div
      id={`grid-cell-${row}-${col}`}
      style={{
        width: `${configDisplay.NODE_SIZE}px`,
        height: `${configDisplay.NODE_SIZE}px`,
      }}
      className={`grid-cell ${extraClassName} ${extraNodeBorder}`}
      onMouseDown={() => onMouseDown(row, col)}
      role="button"
      tabIndex="0"
    >
      {' '}
    </div>
  );
};

export default Node;
