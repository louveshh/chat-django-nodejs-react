import { config } from "./../../config/config";
import { dijkstra } from "./algorithms/dijkstra";
import { AStar } from "./algorithms/aStar";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";

export const options = [
  { value: "wall", label: "Wall" },
  { value: "start", label: "Start" },
  { value: "finish", label: "Finish" },
];

export const createInitialGrid = (points, mode) => {
  const node = (row, col, startRow, finishRow, startCol, finishCol) => {
    return {
      row,
      col,
      isStart: row === startRow && col === startCol && mode !== 'combo',
      isFinish: row === finishRow && col === finishCol && mode !== 'combo',
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(finishRow - row) + Math.abs(finishCol - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };
  const grid = [];
  const { startRow, finishRow, startCol, finishCol } = points;
  const { ROW_COUNT, COLUMN_COUNT } = config;
  for (let row = 0; row < ROW_COUNT; row++) {
    const currentRow = [];
    for (let col = 0; col < COLUMN_COUNT; col++) {
      currentRow.push(node(row, col, startRow, finishRow, startCol, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const clearGridUtil = (isRunning, grid, finishRow, finishCol) => {
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
            Math.abs(finishRow - currentNode.row) +
            Math.abs(finishCol - currentNode.col);
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
            Math.abs(finishRow - currentNode.row) +
            Math.abs(finishCol - currentNode.col);
          currentNode.isStart = true;
          currentNode.isWall = false;
          currentNode.previousNode = null;
          currentNode.isNode = true;
        }
      }
    }
  }
};

export const updateGridClick = (
  row,
  col,
  grid,
  selectedOption,
  points,
  updateGrid,
  updateStartRow,
  updateFinishRow,
  updateStartCol,
  updateFinishCol
) => {
  if (grid === undefined) {
    return;
  }
  if (grid.length === 0) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = points;
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
    const previousStartNode = grid[startRow][startCol];
    const resetStartNode = {
      ...previousStartNode,
      isStart: false,
    };
    updatedGrid[startRow][startCol] = resetStartNode;
    const updatedNode = {
      ...currentNode,
      isWall: false,
      isStart: !currentNode.isStart,
    };
    updatedGrid[row][col] = updatedNode;
    updateStartRow(row);
    updateStartCol(col);
  } else if (
    currentNode.isNode &&
    !currentNode.isStart &&
    selectedOption.value === "finish"
  ) {
    const previousFinishNode = grid[finishRow][finishCol];
    const resetFinishNode = {
      ...previousFinishNode,
      isFinish: false,
    };
    updatedGrid[finishRow][finishCol] = resetFinishNode;
    const updatedNode = {
      ...currentNode,
      isWall: false,
      isFinish: !currentNode.isFinish,
    };
    updatedGrid[row][col] = updatedNode;
    updateFinishRow(row);
    updateFinishCol(col);
  }
  updateGrid(updatedGrid);
};



export const runAlgorithm = (
  algorithm,
  isRunning,
  updateIsRunning,
  grid,
  points
) => {
  if (!isRunning) {
    const getShortestPath = (finishNode) => {
      const shortestPathNodes = [];
      let currentNode = finishNode;
      while (currentNode !== null) {
        shortestPathNodes.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }
      return shortestPathNodes;
    };
    const animateFinalPath = (shortestPathNodes, setIsRunning) => {
      for (let i = 0; i < shortestPathNodes.length; i++) {
        if (shortestPathNodes[i] === "end") {
          setTimeout(() => {
            setIsRunning((prevIsRunning) => !prevIsRunning);
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

    const animate = (visitedNodesInOrder, shortestPathNodes, setIsRunning) => {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            animateFinalPath(shortestPathNodes, setIsRunning);
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
    const { startRow, finishRow, startCol, finishCol } = points;
    updateIsRunning();
    clearGridUtil(isRunning, grid, finishRow, finishCol);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    let visitedNodesInOrder;
    switch (algorithm) {
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
    const nodesInShortestPathOrder = getShortestPath(finishNode);
    nodesInShortestPathOrder.push("end");
    animate(visitedNodesInOrder, nodesInShortestPathOrder, updateIsRunning);
  }
};
