import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { dijkstra } from "./algorithms/dijkstra";
import { AStar } from "./algorithms/aStar";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { config } from "./../../config/config";
import { node } from "./board.utils";

export const useBoard = () => {
  const [grid, setGrid] = useState([]);
  const [gridToAnimate, setGridToAnimate] = useState([]);
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
  };

  const toggleIsRunning = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }, []);

  useEffect(() => {
    const initialGrid = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      const currentRow = [];
      for (let col = 0; col < COLUMN_COUNT; col++) {
        currentRow.push(
          node(
            row,
            col,
            startNodeRow,
            finishNodeRow,
            startNodeCol,
            finishNodeCol
          )
        );
      }
      initialGrid.push(currentRow);
    }
    setGrid(initialGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const clearGrid = useCallback(() => {
    if (!isRunning) {
      const updatedGrid = grid.slice();
      for (const row of updatedGrid) {
        for (const currentNode of row) {
          let classId = document.getElementById(
            `grid-cell-${currentNode.row}-${currentNode.col}`
          ).className;
          if (
            classId !== "grid-cell node-start" &&
            classId !== "grid-cell node-finish" &&
            classId !== "grid-cell node-wall"
          ) {
            document.getElementById(
              `grid-cell-${currentNode.row}-${currentNode.col}`
            ).className = "grid-cell";
            currentNode.isVisited = false;
            currentNode.distance = Infinity;
            currentNode.distanceToFinishNode =
              Math.abs(finishNodeRow - currentNode.row) +
              Math.abs(finishNodeCol - currentNode.col);
          }
          if (classId === "grid-cell node-finish") {
            currentNode.isVisited = false;
            currentNode.distance = Infinity;
            currentNode.distanceToFinishNode = 0;
          }
          if (classId === "grid-cell node-start") {
            currentNode.isVisited = false;
            currentNode.distance = Infinity;
            currentNode.distanceToFinishNode =
              Math.abs(finishNodeRow - currentNode.row) +
              Math.abs(finishNodeCol - currentNode.col);
            currentNode.isStart = true;
            currentNode.isWall = false;
            currentNode.previousNode = null;
            currentNode.isNode = true;
          }
        }
      }
    }
  }, [finishNodeCol, finishNodeRow, grid, isRunning]);

  const clearWalls = useCallback(() => {
    if (!isRunning) {
      const updatedGrid = grid.slice();
      for (const row of updatedGrid) {
        for (const currentNode of row) {
          let classId = document.getElementById(
            `grid-cell-${currentNode.row}-${currentNode.col}`
          ).className;
          if (classId === "grid-cell node-wall") {
            document.getElementById(
              `grid-cell-${currentNode.row}-${currentNode.col}`
            ).className = "grid-cell";
            currentNode.isWall = false;
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
      const updatedGrid = grid.slice();
      const currentNode = grid[row][col];
      if (
        !currentNode.isStart &&
        !currentNode.isFinish &&
        currentNode.isNode &&
        selectedOption.value === "wall"
      ) {
        const updatedNode = {
          ...currentNode,
          isWall: !currentNode.isWall,
        };
        updatedGrid[row][col] = updatedNode;
      } else if (
        currentNode.isNode &&
        !currentNode.isFinish &&
        selectedOption.value === "start"
      ) {
        const previousStartNode = grid[startNodeRow][startNodeCol];
        const resetStartNode = {
          ...previousStartNode,
          isStart: false,
        };
        updatedGrid[startNodeRow][startNodeCol] = resetStartNode;
        const updatedNode = {
          ...currentNode,
          isWall: false,
          isStart: !currentNode.isStart,
        };
        updatedGrid[row][col] = updatedNode;
        setStartNodeRow(row);
        setStartNodeCol(col);
      } else if (
        currentNode.isNode &&
        !currentNode.isStart &&
        selectedOption.value === "finish"
      ) {
        const previousFinishNode = grid[finishNodeRow][finishNodeCol];
        const resetFinishNode = {
          ...previousFinishNode,
          isFinish: false,
        };
        updatedGrid[finishNodeRow][finishNodeCol] = resetFinishNode;
        const updatedNode = {
          ...currentNode,
          isWall: false,
          isFinish: !currentNode.isFinish,
        };
        updatedGrid[row][col] = updatedNode;
        setFinishNodeRow(row);
        setFinishNodeCol(col);
      }
      setGrid(updatedGrid);
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

  const animateShortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      if (shortestPathNodes[i] === "end") {
        setTimeout(() => {
          toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = shortestPathNodes[i];
          const classId = document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className;
          if (
            classId !== "grid-cell node-start" &&
            classId !== "grid-cell node-finish"
          ) {
            document.getElementById(
              `grid-cell-${node.row}-${node.col}`
            ).className = "grid-cell node-shortest-path";
          }
        }, i * 40);
      }
    }
  };

  const getNodesInShortestPathOrder = (finishNode) => {
    const shortestPathNodes = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      shortestPathNodes.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return shortestPathNodes;
  };
  
  const animate = (visitedNodesInOrder, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPathNodes);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const classId = document.getElementById(
          `grid-cell-${node.row}-${node.col}`
        ).className;
        if (
          classId !== "grid-cell node-start" &&
          classId !== "grid-cell node-finish"
        ) {
          document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className = "grid-cell node-visited";
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

  return {
    grid,
    handleMouseDown,
    clearGrid,
    clearWalls,
    visualize,
    selectedOption,
    handleChange,
    options,
  };
};
