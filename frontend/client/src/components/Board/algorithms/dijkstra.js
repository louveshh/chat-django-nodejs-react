export const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = grid.flat();

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
  const { col, row } = node;
  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  for (const neighbor of neighbors) {
    if (!neighbor.isVisited) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
};