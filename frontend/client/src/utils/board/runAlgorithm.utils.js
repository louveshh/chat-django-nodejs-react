import { clearGrid } from './common/clearGrid.utils';
import { dijkstra } from './algorithms/dijkstra.algorithm';
import { AStar } from './algorithms/aStar.algorithm';
import { bfs } from './algorithms/bfs.algorithm';
import { dfs } from './algorithms/dfs.algorithm';

export const runAlgorithm = (
  algorithm,
  isRunning,
  currentGrid,
  currentPoints,
  updateToggleRunning,
  mode = 'board',
  step = 0
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
  const animateFinalPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      if (shortestPathNodes[i] === 'end') {
        setTimeout(
          () => {
            updateToggleRunning();
          },
          mode === 'combo' ? i * 10 : i * 50
        );
      } else {
        setTimeout(
          () => {
            const node = shortestPathNodes[i];
            const classId = document.getElementById(
              `grid-cell-${node.row}-${node.col}`
            );
            const words = classId.className.split(' ');
            if (
              words.indexOf('node-start') < 0 &&
              words.indexOf('node-finish') < 0 &&
              words.indexOf('node-wall') < 0
            ) {
              classId.className = 'grid-cell node-shortest-path';
            }
            if (mode === 'combo') {
              classId.innerText += classId.innerText
                ? `\n${i + step}`
                : i + step;
            }
          },
          mode === 'combo' ? i * 20 : i * 40
        );
      }
    }
  };

  const animate = (visitedNodesInOrder, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(
          () => {
            animateFinalPath(shortestPathNodes);
          },
          mode === 'combo' ? i * 5 : i * 10
        );
        return shortestPathNodes.length;
      }
      setTimeout(
        () => {
          const node = visitedNodesInOrder[i];
          const classId = document.getElementById(
            `grid-cell-${node.row}-${node.col}`
          );
          const words = classId.className.split(' ');
          if (
            words.indexOf('node-start') < 0 &&
            words.indexOf('node-finish') < 0 &&
            words.indexOf('node-wall') < 0
          ) {
            if (mode !== 'combo') {
              document.getElementById(
                `grid-cell-${node.row}-${node.col}`
              ).className = 'grid-cell node-visited';
            }
          }
        },
        mode === 'combo' ? i * 1 : i * 10
      );
    }
  };
  const switchAlgorithm = (algorithm, startNode, finishNode) => {
    switch (algorithm) {
      case 'dijkstra':
        return dijkstra(currentGrid, startNode, finishNode);
      case 'astar':
        return AStar(currentGrid, startNode, finishNode);
      case 'bfs':
        return bfs(currentGrid, startNode, finishNode);
      case 'dfs':
        return dfs(currentGrid, startNode, finishNode);
      default:
        break;
    }
  };
  if (isRunning) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = currentPoints;
  updateToggleRunning();
  if (mode !== 'combo') {
    clearGrid(isRunning, currentGrid);
  }
  const startNode = currentGrid[startRow][startCol];
  const finishNode = currentGrid[finishRow][finishCol];
  console.log(startNode, finishNode);
  const visitedNodesInOrder = switchAlgorithm(algorithm, startNode, finishNode);
  const nodesInShortestPathOrder = getShortestPath(finishNode);
  nodesInShortestPathOrder.push('end');
  return animate(visitedNodesInOrder, nodesInShortestPathOrder);
};
