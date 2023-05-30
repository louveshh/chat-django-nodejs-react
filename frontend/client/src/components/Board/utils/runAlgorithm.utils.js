import { clearGrid } from "./common/clearGrid.utils";
import { dijkstra } from "./algorithms/dijkstra.algorithm";
import { AStar } from "./algorithms/aStar.algorithm";
import { bfs } from "./algorithms/bfs.algorithm";
import { dfs } from "./algorithms/dfs.algorithm";
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
    const switchAlgorithm = (algorithm) => {
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
          break;
      }
    };

    const { startRow, finishRow, startCol, finishCol } = points;
    updateIsRunning();
    clearGrid(isRunning, grid, finishRow, finishCol);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    let visitedNodesInOrder;
    switchAlgorithm(algorithm);
    const nodesInShortestPathOrder = getShortestPath(finishNode);
    nodesInShortestPathOrder.push("end");
    animate(visitedNodesInOrder, nodesInShortestPathOrder, updateIsRunning);
  }
};
