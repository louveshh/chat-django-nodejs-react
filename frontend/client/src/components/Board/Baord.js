import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import Select from "react-select";
import Node from "./../Node/Node";
import { dijkstra } from "./../../utils/algorithms/dijkstra";
import { AStar } from "./../../utils/algorithms/aStar";
import { bfs } from "./../../utils/algorithms/bfs";
import { dfs } from "./../../utils/algorithms/dfs";

import "./Board.css";

const Baord = () => {
  const [grid, setGrid] = useState([]);

  const config = {
    ROW_COUNT: 40,
    COLUMN_COUNT: 40,
  };

  const { ROW_COUNT, COLUMN_COUNT } = config;

  const [isRunning, setIsRunning] = useState(false);
  const [startNodeRow, setStartNodeRow] = useState(5);
  const [finishNodeRow, setFinishNodeRow] = useState(5);
  const [startNodeCol, setStartNodeCol] = useState(5);
  const [finishNodeCol, setFinishNodeCol] = useState(15);

  const options = [
    { value: "wall", label: "Wall" },
    { value: "start", label: "Start" },
    { value: "finish", label: "Finish" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(options[0]);
    console.log(`Option selected:`, selectedOption);
  };

  const createNode = useCallback(
    (row, col) => {
      return {
        row,
        col,
        isStart: row === startNodeRow && col === startNodeCol,
        isFinish: row === finishNodeRow && col === finishNodeCol,
        distance: Infinity,
        distanceToFinishNode:
          Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col),
        isVisited: false,
        isWall: false,
        previousNode: null,
        isNode: true,
      };
    },
    [finishNodeCol, finishNodeRow, startNodeCol, startNodeRow]
  );

  const getInitialGrid = useCallback(
    (rowCount = ROW_COUNT, colCount = COLUMN_COUNT) => {
      const initialGrid = [];
      for (let row = 0; row < rowCount; row++) {
        const currentRow = [];
        for (let col = 0; col < colCount; col++) {
          currentRow.push(createNode(row, col));
        }
        initialGrid.push(currentRow);
      }
      return initialGrid;
    },
    [COLUMN_COUNT, ROW_COUNT, createNode]
  );

  const toggleIsRunning = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }, []);

  useEffect(() => {
    console.log("xd?12312312");
    setGrid(getInitialGrid());
  }, []);

  const clearGrid = useCallback(() => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "grid-cell node-start" &&
            nodeClassName !== "grid-cell node-finish" &&
            nodeClassName !== "grid-cell node-wall"
          ) {
            document.getElementById(`grid-cell-${node.row}-${node.col}`).className =
              "grid-cell";
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(finishNodeRow - node.row) +
              Math.abs(finishNodeCol - node.col);
          }
          if (nodeClassName === "grid-cell node-finish") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === "grid-cell node-start") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(finishNodeRow - node.row) +
              Math.abs(finishNodeCol - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }, [finishNodeCol, finishNodeRow, grid, isRunning]);

  const clearWalls = useCallback(() => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className;
          if (nodeClassName === "grid-cell node-wall") {
            document.getElementById(`grid-cell-${node.row}-${node.col}`).className =
              "grid-cell";
            node.isWall = false;
          }
        }
      }
    }
  }, [grid, isRunning]);

  const getNewGridWithWallToggled = useCallback(
    (row, col) => {
      console.log(row, col);
      if (grid === undefined) {
        return;
      }
      if (grid.length === 0) {
        return;
      }
      const newGrid = grid.slice();
      const node = grid[row][col];
      if (
        !node.isStart &&
        !node.isFinish &&
        node.isNode &&
        selectedOption.value === "wall"
      ) {
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
      } else if (
        node.isNode &&
        !node.isFinish &&
        selectedOption.value === "start"
      ) {
        const prevStart = grid[startNodeRow][startNodeCol];
        const resetStartNode = {
          ...prevStart,
          isStart: false,
        };
        newGrid[startNodeRow][startNodeCol] = resetStartNode;
        const newNode = {
          ...node,
          isWall: false,
          isStart: !node.isStart,
        };
        newGrid[row][col] = newNode;
        setStartNodeRow(row);
        setStartNodeCol(col);
      } else if (
        node.isNode &&
        !node.isStart &&
        selectedOption.value === "finish"
      ) {
        const prevEnd = grid[finishNodeRow][finishNodeCol];
        const resetFinishNode = {
          ...prevEnd,
          isFinish: false,
        };
        newGrid[finishNodeRow][finishNodeCol] = resetFinishNode;
        const newNode = {
          ...node,
          isWall: false,
          isFinish: !node.isFinish,
        };

        newGrid[row][col] = newNode;
        setFinishNodeRow(row);
        setFinishNodeCol(col);
      }
      setGrid(newGrid);
    },
    [
      grid,
      selectedOption,
      startNodeCol,
      startNodeRow,
      finishNodeCol,
      finishNodeRow,
    ]
  );

  const handleMouseDown = useCallback(
    (row, col) => {
      getNewGridWithWallToggled(row, col);
    },

    [getNewGridWithWallToggled]
  );

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === "end") {
        setTimeout(() => {
          toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "grid-cell node-start" &&
            nodeClassName !== "grid-cell node-finish"
          ) {
            document.getElementById(`grid-cell-${node.row}-${node.col}`).className =
              "grid-cell node-shortest-path";
          }
        }, i * 40);
      }
    }
  };

  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };
  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `grid-cell-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "grid-cell node-start" &&
          nodeClassName !== "grid-cell node-finish"
        ) {
          document.getElementById(`grid-cell-${node.row}-${node.col}`).className =
            "grid-cell node-visited";
        }
      }, 10 * i);
    }
  };

  const visualize = (algo) => {
    if (!isRunning) {
      clearGrid();
      toggleIsRunning();
      const startNode = grid[startNodeRow][startNodeCol];
      const finishNode = grid[finishNodeRow][finishNodeCol];
      let visitedNodesInOrder;
      switch (algo) {
        case "Dijkstra":
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);

          break;
        case "AStar":
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        case "BFS":
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case "DFS":
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        default:
          // should never get here
          break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push("end");
      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  return (
    <div className="temp-top">
      <div className="grid-container">
        {[].concat(...grid).map((node, nodeIdx) => {
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
          className="btn btn-warning"
          onClick={() => clearWalls()}
        >
          Clear Walls
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
