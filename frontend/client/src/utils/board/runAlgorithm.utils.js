import { mode, node, board } from 'config/config';
import { clearGrid } from './common/clearGrid.utils';
import { dijkstra } from './algorithms/dijkstra.algorithm';
import { aStar } from './algorithms/aStar.algorithm';
import { bfs } from './algorithms/bfs.algorithm';
import { dfs } from './algorithms/dfs.algorithm';

export const runAlgorithm = (
  algorithm,
  pathingInProgress,
  currentGrid,
  currentPoints,
  updateToggleRunning,
  currentMode = mode.board,
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
        if (shortestPathNodes[i] === node.end) {
          setTimeout(
            () => {
              updateToggleRunning();
            },
            currentMode === mode.combo ? i * 40 : i * 50
          );
        } else {
          setTimeout(
            () => {
              const currentNode = shortestPathNodes[i];
              const classId = document.getElementById(
                `${node.base}-${currentNode.row}-${currentNode.col}`
              );
              const words = classId.className.split(' ');
              const { startRow, finishRow, startCol, finishCol } =
                currentPoints;
              if (
                startRow === currentNode.row &&
                startCol === currentNode.col &&
                currentMode !== mode.combo
              ) {
                classId.className = `${node.base} ${node.start}`;
              } else if (
                finishRow === currentNode.row &&
                finishCol === currentNode.col &&
                currentMode !== mode.combo
              ) {
                classId.className = `${node.base} ${node.finish}`;
              } else if (words.indexOf(`${node.shortest}`) < 0) {
                classId.className = `${node.base} ${node.shortest}`;
              }
              if (currentMode === mode.combo) {
                classId.innerText += classId.innerText
                  ? `\n${i + step}`
                  : i + step;
              }
            },
            currentMode === mode.combo ? i * 30 : i * 40
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
            currentMode === mode.combo ? i * 3 : i * 5
          );
          if (shortestPathNodes) {
            return shortestPathNodes.length;
          }
          return 0;
        }
        setTimeout(
          () => {
            const currentNode = visitedNodesInOrder[i];
            const classId = document.getElementById(
              `${node.base}-${currentNode.row}-${currentNode.col}`
            );
            const { startRow, finishRow, startCol, finishCol } = currentPoints;
            const words = classId.className.split(' ');
            if (
              !(startRow === currentNode.row && startCol === currentNode.col) &&
              !(
                finishRow === currentNode.row && finishCol === currentNode.col
              ) &&
              words.indexOf(`${node.shortest}`) < 0
            ) {
              classId.className = `${node.base} ${node.visited}`;
            }
          },
          currentMode === mode.combo ? i * 3 : i * 5
        );
      }
    }
  };
  const switchAlgorithm = (algorithm, startNode, finishNode) => {
    switch (algorithm) {
      case board.dijkstra:
        return dijkstra(currentGrid, startNode, finishNode);
      case board.astar:
        return aStar(currentGrid, startNode, finishNode);
      case board.bfs:
        return bfs(currentGrid, startNode, finishNode);
      case board.dfs:
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
  if (currentMode !== mode.combo) {
    clearGrid(pathingInProgress, currentGrid);
  }
  const startNode = currentGrid[startRow][startCol];
  const finishNode = currentGrid[finishRow][finishCol];
  const visitedNodesInOrder = switchAlgorithm(algorithm, startNode, finishNode);
  const nodesInShortestPathOrder = getShortestPath(finishNode);
  nodesInShortestPathOrder.push(node.end);
  return animate(visitedNodesInOrder, nodesInShortestPathOrder);
};
