export const dfs = (grid, startNode, finishNode) => {
  const getUnvisitedNeighbors = (grid, node) => {
    const neighbors = [];
    const { col, row } = node;

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

    return neighbors.filter((neighbor) => !neighbor.isVisited);
  };
  const visitedNodesInOrder = [];
  const stack = [];
  stack.push(startNode);

  while (stack.length) {
    const currentNode = stack.pop();

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    if (
      !currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
    ) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);

      const neighbors = getUnvisitedNeighbors(grid, currentNode);
      neighbors.forEach((neighbor) => {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      });
    }
  }

  return visitedNodesInOrder;
};
