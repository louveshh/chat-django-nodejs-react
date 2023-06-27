// ADJUSTABLE VALUES OF CONFIG

export const mode = {
  map: 'map',
  board: 'board',
  combo: 'combo',
  add: 'add',
};

export const grid = {
  display: 640,
  cells: 40, // cannot be 0
  scale: 0.5, // cannot be 0
};
export const board = {
  dijkstra: 'dijkstra',
  astar: 'astar',
  dfs: 'dfs',
  bfs: 'bfs',
};

export const draw = {
  wall: 'wall',
  start: 'start',
  finish: 'finish',
};

export const map = {
  tsg: 'tsg',
  sort: 'sort',
  random: 'random',
};

export const node = {
  base: 'node-base',
  finish: 'node-finish',
  start: 'node-start',
  wall: 'node-wall',
  border: 'node-border',
  end: 'end',
  visited: 'node-visited',
  shortest: 'node-shortest-path',
};

export const pallete = {
  light: 'light',
  dark: 'dark',
};
// ADJUSTABLE CONFIG SETUP

export const configDisplay = {
  DISPLAY_SIZE: grid.display,
  AMOUNT_OF_CELLS: grid.cells, // cannot be 0
  SCALE: grid.scale, // cannot be 0

  NODE_SIZE: () => configDisplay.DISPLAY_SIZE / configDisplay.AMOUNT_OF_CELLS,
  SCALED_DISPLAY_SIZE: () =>
    configDisplay.DISPLAY_SIZE * configDisplay.SCALE + 2,
  RESCALED_VALUE: () => configDisplay.DISPLAY_SIZE / configDisplay.SCALE + 1,
  SCALED_CLICK: () => 1 / configDisplay.SCALE,
  RIGHT_PANEL_SCALED: () => configDisplay.DISPLAY_SIZE * 0.7,
};

export const configBoard = {
  drawOptions: [
    // board setting to click
    { value: draw.wall, label: draw.wall },
    { value: draw.start, label: draw.start },
    { value: draw.finish, label: draw.finish },
  ],
  defaultDrawOption: {
    // combo default setting
    value: draw.wall,
    label: draw.wall,
  },
  algorithmOptions: [
    // board possible algorithms
    { value: board.dijkstra, label: board.dijkstra },
    { value: board.astar, label: board.astar },
    { value: board.dfs, label: board.dfs },
    { value: board.bfs, label: board.bfs },
  ],
  // ## to edit END ##
};

export const configMap = {
  clickPossibleTargets: [
    // maps where click is possible
    mode.map,
    mode.add,
  ],
  mouseMoveCities: [
    // maps where info about city is possible
    mode.map,
    mode.add,
  ],
  context: {
    // settings for canvas
    imageSmoothingEnabled: true,
    lineJoin: 'round',
    lineCap: 'round',
    lineWidth: 2,
  },
  algorithmOptions: [
    // map possible algorithms
    { value: map.tsg, label: map.tsg },
    { value: map.sort, label: map.sort },
    { value: map.random, label: map.random },
  ],
};

export const configPanel = {
  mapModes: [
    // display map on those modes
    mode.map,

    mode.combo,
    mode.add,
  ],
  boardModes: [
    // display board on those modes
    mode.board,
    mode.combo,
  ],
  comboModes: [mode.combo],
  addModes: [mode.add],
};
