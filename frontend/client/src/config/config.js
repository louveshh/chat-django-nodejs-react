export const configDisplay = {
  AMOUNT_OF_CELLS: 40, // cannot be 0
  DISPLAY_SIZE: 640,
  SCALE: 0.7, // cannot be 0
  NODE_SIZE: () => configDisplay.DISPLAY_SIZE / configDisplay.AMOUNT_OF_CELLS,
  SCALED_DISPLAY_SIZE: () =>
    configDisplay.DISPLAY_SIZE / configDisplay.SCALE + 1,
  SCALED_CLICK: () => 1 / configDisplay.SCALE,
};

export const configBoard = {
  drawOptions: [
    // board setting to click
    { value: 'wall', label: 'Wall' },
    { value: 'start', label: 'Start' },
    { value: 'finish', label: 'Finish' },
  ],
  defaultDrawOption: {
    // combo default setting
    value: 'wall',
    label: 'Wall',
  },
  algorithmOptions: [
    // board possible algorithms
    { value: 'dijkstra', label: 'Dijkstra' },
    { value: 'astar', label: 'AStar' },
    { value: 'dfs', label: 'DFS' },
    { value: 'bfs', label: 'BFS' },
  ],
};

export const configMap = {
  clickPossibleTargets: [
    // maps where click is possible
    'display',
    'map',
    'add',
  ],
  mouseMoveCities: [
    // maps where info about city is possible
    'display',
    'map',
    'add',
  ],
  colors: {
    // colors used in map
    clickedCity: '#ffaacc',
    highlightedCity: 'yellow',
    city: 'black',
    testingLine: 'yellow',
    line: 'black',
  },
  context: {
    // settings for canvas
    imageSmoothingEnabled: true,
    lineJoin: 'round',
    lineCap: 'round',
    lineWidth: 2,
  },
  algorithmOptions: [
    // map possible algorithms
    { value: 'tsg', label: 'TSG' },
    { value: 'sort', label: 'Sort' },
    { value: 'random', label: 'Random' },
  ],
};

export const configPanel = {
  mapModes: [
    // display map on those modes
    'map',
    'display',
    'combo',
    'add',
  ],
  boardModes: [
    // display board on those modes
    'board',
    'combo',
  ],
};

export const configToggle = ['display', 'board', 'map', 'combo', 'add'];
