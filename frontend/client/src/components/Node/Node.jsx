import './Node.css';

const Node = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  // children,
}) => {
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';
  return (
    <div
      id={`grid-cell-${row}-${col}`}
      className={`grid-cell ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      role="button"
      tabIndex="0"
    >
      {/* <span className="grid-cell-span ">{children}</span> */}
    </div>
  );
};

export default Node;
