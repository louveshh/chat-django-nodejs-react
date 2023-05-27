import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import Node from "./../Node/Node";
import { dijkstra } from "./../../utils/algorithms/dijkstra";
import { AStar } from "./../../utils/algorithms/aStar";
import { bfs } from "./../../utils/algorithms/bfs";
import { dfs } from "./../../utils/algorithms/dfs";

import "./Board.css";

const Baord = () => {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(5);
  const [finishNodeRow, setFinishNodeRow] = useState(5);
  const [startNodeCol, setStartNodeCol] = useState(5);
  const [finishNodeCol, setFinishNodeCol] = useState(15);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [ROW_COUNT, setRowCount] = useState(25);
  const [COLUMN_COUNT, setColumnCount] = useState(35);
  const [MOBILE_ROW_COUNT, setMobileRowCount] = useState(10);
  const [MOBILE_COLUMN_COUNT, setMobileColumnCount] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isWallNode, setIsWallNode] = useState(false); // xxxxxxx
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [isDesktopView, setIsDesktopView] = useState(true);

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
    setGrid(getInitialGrid());
  }, [getInitialGrid]);

  const clearGrid = useCallback(() => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-finish" &&
            nodeClassName !== "node node-wall"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(finishNodeRow - node.row) +
              Math.abs(finishNodeCol - node.col);
          }
          if (nodeClassName === "node node-finish") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === "node node-start") {
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
            `node-${node.row}-${node.col}`
          ).className;
          if (nodeClassName === "node node-wall") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isWall = false;
          }
        }
      }
    }
  }, [grid, isRunning]);

  const toggleView = useCallback(() => {
    if (!isRunning) {
      clearGrid();
      clearWalls();
      const newIsDesktopView = !isDesktopView;
      let grid;
      if (newIsDesktopView) {
        grid = getInitialGrid(ROW_COUNT, COLUMN_COUNT);
        setIsDesktopView(newIsDesktopView);
        setGrid(grid);
      } else {
        if (
          startNodeRow > MOBILE_ROW_COUNT ||
          finishNodeRow > MOBILE_ROW_COUNT ||
          startNodeCol > MOBILE_COLUMN_COUNT ||
          finishNodeCol > MOBILE_COLUMN_COUNT
        ) {
          alert("Start & Finish Nodes Must Be within 10 Rows x 20 Columns");
        } else {
          grid = getInitialGrid(MOBILE_ROW_COUNT, MOBILE_COLUMN_COUNT);
          setIsDesktopView(newIsDesktopView);
          setGrid(grid);
        }
      }
    }
  }, [
    COLUMN_COUNT,
    finishNodeCol,
    finishNodeRow,
    MOBILE_COLUMN_COUNT,
    MOBILE_ROW_COUNT,
    ROW_COUNT,
    startNodeCol,
    startNodeRow,
    clearGrid,
    clearWalls,
    getInitialGrid,
    isDesktopView,
    isRunning,
  ]);

  const getNewGridWithWallToggled = useCallback(
    (row, col) => {
      if (grid === undefined) {
        return;
      }
      if (grid.length === 0) {
        return;
      }
      if (!row || !col) {
        return;
      }
      const newGrid = grid.slice();
      const node = newGrid[row][col];
      if (!node.isStart && !node.isFinish && node.isNode) {
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
      }
      return newGrid;
    },
    [grid]
  );

  const isGridClear = useCallback(() => {
    for (const row of grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName === "node node-visited" ||
          nodeClassName === "node node-shortest-path"
        ) {
          return false;
        }
      }
    }
    return true;
  }, [grid]);

  const handleMouseDown = useCallback(
    (row, col) => {
      if (!isRunning) {
        console.log('down')
        if (isGridClear()) {
          if (
            document.getElementById(`node-${row}-${col}`).className ===
            "node node-start"
          ) {
            setMouseIsPressed(true);
            setIsStartNode(true);
            setCurrRow(row);
            setCurrCol(col);
          } else if (
            document.getElementById(`node-${row}-${col}`).className ===
            "node node-finish"
          ) {
            setMouseIsPressed(true);
            setIsFinishNode(true);
            setCurrRow(row);
            setCurrCol(col);
            setIsFinishNode(true);
          } else {
            const newGrid = getNewGridWithWallToggled(row, col);
            setGrid(newGrid);
            setMouseIsPressed(true);
            setIsWallNode(true);
            setCurrRow(row);
            setCurrCol(col);
          }
        } else {
          clearGrid();
        }
      }
    },
    [clearGrid, getNewGridWithWallToggled, isGridClear, isRunning]
  );



  const animateShortestPath = (nodesInShortestPathOrder) => {
    console.log(nodesInShortestPathOrder)
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === "end") {
        setTimeout(() => {
          toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-finish"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path";
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
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
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
          console.log(visitedNodesInOrder)
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
    <div>
      <table className="grid-container" >
        <tbody className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <tr key={rowIdx}>
                {row.map((node, nodeIdx) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
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
      {isDesktopView ? (
        <button
          type="button"
          className="btn btn-light"
          onClick={() => toggleView()}
        >
          Mobile View
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => toggleView()}
        >
          Desktop View
        </button>
      )}
    </div>
  );
};

export default Baord;
