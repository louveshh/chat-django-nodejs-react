export const AStar = (grid, startNode, finishNode) => {
  const sortByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = grid.flat();
  while (unvisitedNodes.length) {
    sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) {
      continue;
    }

    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }

    const { col, row } = closestNode;
    const neighbors = [];

    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }

    if (row < grid.length - 1) {
      neighbors.push(grid[row + 1][col]);
    }

    if (col > 0) {
      neighbors.push(grid[row][col - 1]);
    }

    if (col < grid[0].length - 1) {
      neighbors.push(grid[row][col + 1]);
    }

    neighbors.forEach((neighbor) => {
      if (!neighbor.isVisited) {
        neighbor.distance =
          closestNode.distance + 1 + neighbor.distanceToFinishNode;
        neighbor.previousNode = closestNode;
      }
    });
  }
};
