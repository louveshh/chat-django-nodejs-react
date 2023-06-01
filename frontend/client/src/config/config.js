export const configBoard = {
  ROW_COUNT: 40,
  COLUMN_COUNT: 40,
  drawOptions: [
    { value: 'wall', label: 'Wall' },
    { value: 'start', label: 'Start' },
    { value: 'finish', label: 'Finish' },
  ],
  defaultDrawOption: { value: 'wall', label: 'Wall' },
};

export const configMap = {
  clearButton: ['display', 'map', 'add'],
  clickPossibleTargets: ['map'],
  mouseMoveCities: ['display', 'map', 'add'],
  colors: {
    clickedCity: 'red',
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
};

export const configView = {
  mapModes: ['map', 'display', 'combo', 'add'],
  boardModes: ['board', 'combo'],
};

export const toogle = ['display', 'board', 'map', 'combo', 'add'];
