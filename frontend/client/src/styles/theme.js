const color = {
  green1: 'RGB(32,90,54)',
  green2: 'RGB(32,110,64)',
  green3: 'RGB(32,70,40)',
  green4: 'RGBA(0, 256, 0, 0.9)',
  green5: 'RGBA(0, 181, 60, 0.682)',
  green6: 'RGBA(0, 256, 0, 0.3)',
  blue1: 'RGBA(15,57,147,1)',
  blue2: 'RGB(0,57,93)',
  blue3: 'RGB(0,49,83)',
  blue4: 'RGB(0,19,53)',
  blue5: 'RGBA(16,35,84)',
  blue6: 'RGBA(0, 181, 255, 0.32)',
  blue7: 'RGBA(0, 221, 255, 0.56)',
  red1: 'RGBA(255,0,0,0.8)',
  red2: 'RGBA(165, 16, 16, 0.686)',
  red3: 'RGBA(255,0,0,0.3)',
  yellow1: 'RGB(255, 200, 0)',
  yellow2: 'RGBA(245, 221, 9, 0.776)',
  purple1: 'RGBA(89, 60, 143, 0.74)',
  purple2: 'RGBA(165, 16, 255, 0.56)',
  black1: 'RGBA(0, 0, 9, 1)',
  black2: 'RGB(3, 28, 30)',
  black3: 'RGBA(255, 200, 0.2)',
};

const font = {
  gotham: `Gotham, 'Segoe UI', sans-serif`,
  gothamXNarr: `GothamXNarr, 'Segoe UI', sans-serif`,
  openSans: `'Open Sans', sans-serif`,
};

export const light = {
  view: {
    primary: color.green1,
    secondary: color.green2,
    secondary2: color.green3,
    background: color.blue1,
  },

  board: {
    start: color.green4,
    finish: color.red1,
    wall: color.green3,
    visited0: color.yellow1,
    visited25: color.red1,
    visited100: color.purple1,
    shortest0: color.green5,
    shortest50: color.red2,
    shortest100: color.yellow2,
  },

  map: {
    clickedCity: color.red1,
    highlightedCity: color.yellow1,
    city: color.black1,
    testingLine: color.yellow2,
    line: color.black1,
  },

  font: {
    gotham: font.gotham,
    gothamXNarr: font.gothamXNarr,
    openSans: font.openSans,
  },
};

export const dark = {
  view: {
    primary: color.blue2,
    secondary: color.blue3,
    secondary2: color.blue4,
    background: color.blue5,
  },

  board: {
    start: color.green6,
    finish: color.red3,
    wall: color.black2,
    visited0: color.black3,
    visited25: color.blue5,
    visited100: color.purple1,
    shortest0: color.blue6,
    shortest50: color.purple2,
    shortest100: color.blue7,
  },

  map: {
    clickedCity: color.red3,
    highlightedCity: color.blue7,
    city: color.black1,
    testingLine: color.blue1,
    line: color.black1,
  },

  font: {
    gotham: font.gotham,
    gothamXNarr: font.gothamXNarr,
    openSans: font.openSans,
  },
};
