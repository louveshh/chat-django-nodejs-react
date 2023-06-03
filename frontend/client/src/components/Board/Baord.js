import Select from 'react-select';
import Node from '../Node/Node';
import { useBoard } from './board.hooks';

import './Board.css';
import { configBoard } from '../../config/config';

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
    <>
      <div className="grid-container">
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
      </div>
      <div className="without-absolute">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleClearGrid}
        >
          Clear Grid
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAlgorithm('Dijkstra')}
        >
          Dijkstra's
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAlgorithm('AStar')}
        >
          A*
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAlgorithm('BFS')}
        >
          Bread First Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAlgorithm('DFS')}
        >
          Depth First Search
        </button>
        {activeMode === 'board' && (
          <Select
            className="select"
            onChange={handleChange}
            value={selectedOption}
            options={configBoard.drawOptions}
          />
        )}
      </div>
    </>
  );
};

export default Baord;
