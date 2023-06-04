export const configBoard = {
  ROW_COUNT: 40,
  COLUMN_COUNT: 40,
  drawOptions: [
    { value: 'wall', label: 'Wall' },
    { value: 'start', label: 'Start' },
    { value: 'finish', label: 'Finish' },
  ],
  defaultDrawOption: { value: 'wall', label: 'Wall' },
  algorithmOptions: [
    { value: 'dijkstra', label: 'Dijkstra' },
    { value: 'astar', label: 'AStar' },
    { value: 'dfs', label: 'DFS' },
    { value: 'bfs', label: 'BFS' },
  ],
};

export const configMap = {
  settings: ['map', 'combo'],
  clearButton: ['display', 'map', 'add', 'combo'],
  clickPossibleTargets: ['map'],
  mouseMoveCities: ['display', 'map', 'add'],
  colors: {
    clickedCity: '#ffaacc',
    highlightedCity: 'yellow',
    city: 'black',
    testingLine: 'yellow',
    line: 'black',
  },
  context: {
    imageSmoothingEnabled: true,
    lineJoin: 'round',
    lineCap: 'round',
    lineWidth: 2,
  },
  algorithmOptions: [
    { value: 'tsg', label: 'TSG' },
    { value: 'sort', label: 'Sort' },
    { value: 'random', label: 'Random' },
  ],
};

export const configPanel = {
  mapModes: ['map', 'display', 'combo', 'add'],
  boardModes: ['board', 'combo'],
};

export const toggle = ['display', 'board', 'map', 'combo', 'add'];
