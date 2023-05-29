import Select from "react-select";
import Node from "./../Node/Node";
import { useBoard } from "./board.hooks";

import "./Board.css";

const Baord = () => {
  const {
    grid,
    handleMouseDown,
    clearGrid,
    visualize,
    selectedOption,
    handleChange,
    options,
  } = useBoard();

  return (
    <div className="temp-top">
      <div className="grid-container">
        {grid&& [].concat(...grid)?.map((node, nodeIdx) => {
          const { row, col, isFinish, isStart, isWall } = node;
          return (
            <Node
              key={nodeIdx}
              col={col}
              isFinish={isFinish}
              isStart={isStart}
              isWall={isWall}
              onMouseDown={(row, col) => handleMouseDown(row, col)}
              row={row}
            ></Node>
          );
        })}
      </div>
      <div className="temp-space">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => clearGrid()}
        >
          Clear Grid
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("Dijkstra")}
        >
          Dijkstra's
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("AStar")}
        >
          A*
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("BFS")}
        >
          Bread First Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("DFS")}
        >
          Depth First Search
        </button>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          className="select"
        />
      </div>
    </div>
  );
};

export default Baord;
