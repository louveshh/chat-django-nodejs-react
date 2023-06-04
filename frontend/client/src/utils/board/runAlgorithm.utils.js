import { clearGrid } from './common/clearGrid.utils';
import { dijkstra } from './algorithms/dijkstra.algorithm';
import { AStar } from './algorithms/aStar.algorithm';
import { bfs } from './algorithms/bfs.algorithm';
import { dfs } from './algorithms/dfs.algorithm';

export const runAlgorithm = (
  algorithm,
  isRunning,
  updateIsRunning,
  grid,
  points
) => {
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
      if (shortestPathNodes[i] === 'end') {
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
            classId !== 'grid-cell node-start' &&
            classId !== 'grid-cell node-finish'
          ) {
            document.getElementById(
              `grid-cell-${node.row}-${node.col}`
            ).className = 'grid-cell node-shortest-path';
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
          classId !== 'grid-cell node-start' &&
          classId !== 'grid-cell node-finish'
        ) {
          document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          ).className = 'grid-cell node-visited';
        }
      }, 10 * i);
    }
  };
  const switchAlgorithm = (algorithm, startNode, finishNode) => {
    switch (algorithm) {
      case 'dijkstra':
        return dijkstra(grid, startNode, finishNode);
      case 'astar':
        return AStar(grid, startNode, finishNode);
      case 'bfs':
        return bfs(grid, startNode, finishNode);
      case 'dfs':
        return dfs(grid, startNode, finishNode);
      default:
        break;
    }
  };
  if (isRunning) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = points;
  updateIsRunning();
  clearGrid(isRunning, grid, finishRow, finishCol);
  const startNode = grid[startRow][startCol];
  const finishNode = grid[finishRow][finishCol];
  const visitedNodesInOrder = switchAlgorithm(algorithm, startNode, finishNode);
  const nodesInShortestPathOrder = getShortestPath(finishNode);
  nodesInShortestPathOrder.push('end');
  animate(visitedNodesInOrder, nodesInShortestPathOrder, updateIsRunning);
};
