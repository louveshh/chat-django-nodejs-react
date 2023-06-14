import { clearGrid } from './common/clearGrid.utils';
import { dijkstra } from './algorithms/dijkstra.algorithm';
import { AStar } from './algorithms/aStar.algorithm';
import { bfs } from './algorithms/bfs.algorithm';
import { dfs } from './algorithms/dfs.algorithm';

export const runAlgorithm = (
  algorithm,
  pathingInProgress,
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
    if (shortestPathNodes) {
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
              const classId = document.getElementById(`node-base-${node.row}-${node.col}`);
              const words = classId.className.split(' ');
              const { startRow, finishRow, startCol, finishCol } = currentPoints;
              if (startRow === node.row && startCol === node.col && mode !== 'combo') {
                classId.className = 'node-base node-start';
              } else if (finishRow === node.row && finishCol === node.col && mode !== 'combo') {
                classId.className = 'node-base node-finish';
              } else if (words.indexOf('node-shortest-path') < 0) {
                classId.className = 'node-base node-shortest-path';
              }
              if (mode === 'combo') {
                classId.innerText += classId.innerText ? `\n${i + step}` : i + step;
              }
            },
            mode === 'combo' ? i * 20 : i * 40
          );
        }
      }
    }
  };

  const animate = (visitedNodesInOrder, shortestPathNodes) => {
    if (visitedNodesInOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(
            () => {
              animateFinalPath(shortestPathNodes);
            },
            mode === 'combo' ? i * 1 : i * 5
          );
          if (shortestPathNodes) {
            return shortestPathNodes.length;
          }
          return 0;
        }
        setTimeout(
          () => {
            const node = visitedNodesInOrder[i];
            const classId = document.getElementById(`node-base-${node.row}-${node.col}`);
            const { startRow, finishRow, startCol, finishCol } = currentPoints;
            const words = classId.className.split(' ');
            if (
              !(startRow === node.row && startCol === node.col) &&
              !(finishRow === node.row && finishCol === node.col) &&
              words.indexOf('node-shortest-path') < 0
            ) {
              classId.className = 'node-base node-visited';
            }
          },
          mode === 'combo' ? i * 1 : i * 5
        );
      }
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
  if (pathingInProgress) {
    return;
  }
  const { startRow, finishRow, startCol, finishCol } = currentPoints;
  updateToggleRunning();
  if (mode !== 'combo') {
    clearGrid(pathingInProgress, currentGrid);
  }
  const startNode = currentGrid[startRow][startCol];
  const finishNode = currentGrid[finishRow][finishCol];
  const visitedNodesInOrder = switchAlgorithm(algorithm, startNode, finishNode);
  const nodesInShortestPathOrder = getShortestPath(finishNode);
  nodesInShortestPathOrder.push('end');
  return animate(visitedNodesInOrder, nodesInShortestPathOrder);
};
