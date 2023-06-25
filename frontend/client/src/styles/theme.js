const color = {
  green1: 'RGB(32,90,54)',
  green2: 'RGB(32,110,64)',
  green3: 'RGB(32,70,40)',
  green4: 'RGBA(0, 256, 0, 0.9)',
  green5: 'RGBA(0, 181, 60, 0.682)',
  green6: 'RGBA(0, 256, 0, 0.3)',
  green7: 'RGBA(0, 181, 60, 1)',
  blue1: 'RGBA(15,57,147,1)',
  blue2: 'RGB(0,57,93)',
  blue3: 'RGB(0,49,83)',
  blue4: 'RGB(0,19,53)',
  blue5: 'RGBA(16,35,84)',
  blue6: 'RGBA(0, 181, 255, 0.32)',
  blue7: 'RGBA(0, 221, 255, 0.56)',
  blue8: 'RGBA(0, 200, 255, 1)',
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
  black4: 'RGBA(0, 0, 0, 0.09)',
  transparent: 'RGBA(43, 8, 8, 0)',
  white1: 'RGBA(250,250,250)',
  white2: 'RGBA(200,200,200, 0.90)',
  gray1: 'RGBA(77,77,77)',
  gray2: 'RGBA(255,255,255,0.1)',
};

const font = {
  gotham: `Gotham, 'Segoe UI', sans-serif`,
  gothamXNarr: `GothamXNarr, 'Segoe UI', sans-serif`,
  openSans: `'Open Sans', sans-serif`,
};

export const light = {
  view: {
    primary: color.green1,
    primary2: color.green7,
    secondary: color.green2,
    secondary2: color.green3,
    secondary3: color.green5,
    background: color.blue1,
    black: color.black1,
    white: color.white2,
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
    text: color.red1,
  },

  font: {
    gotham: font.gotham,
    gothamXNarr: font.gothamXNarr,
    openSans: font.openSans,
  },
  button: {
    enabled: color.green7,
    loading: color.black4,
    loading2: color.green7,
    background: color.black4,
  },
  toggle: {
    enabled: color.green1,
    background1: color.gray1,
    background2: color.white1,
    hover: color.green5,
  },
  ocean: {
    color: color.gray2,
  },

  city: {
    background: color.gray2,
  },
};

export const dark = {
  view: {
    primary: color.blue2,
    primary2: color.blue7,
    secondary: color.blue3,
    secondary2: color.blue4,
    secondary3: color.blue8,
    background: color.blue5,
    white: color.white2,
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
    clickedCity: color.blue8,
    highlightedCity: color.blue8,
    city: color.black1,
    testingLine: color.blue8,
    line: color.black1,
    text: color.red1,
  },

  font: {
    gotham: font.gotham,
    gothamXNarr: font.gothamXNarr,
    openSans: font.openSans,
  },
  button: {
    enabled: color.blue8,
    loading: color.black4,
    loading2: color.blue8,
    background: color.black4,
  },
  toggle: {
    enabled: color.blue1,
    background1: color.gray1,
    background2: color.white1,
    hover: color.blue7,
  },
  ocean: {
    color: color.gray2,
  },
  city: {
    background: color.gray2,
  },
};
