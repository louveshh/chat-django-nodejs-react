import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circlePoint: { x: 320, y: 320, weight: 0, selectedStart: false, name: "click" },
  randomPoints: [],
  pathingInProgress: false,
  toClear: false,
  clickPossible: false
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCirclePoint: (state, action) => {
      state.circlePoint = action.payload;
    },
    setRandomPoints: (state, action) => {
      state.randomPoints = action.payload;
    },
    setPathingInProgress: (state, action) => {
      state.pathingInProgress = action.payload;
    },
    setClear: (state, action) => {
      state.toClear = action.payload;
    },
    setSelectStartCity: (state, action) => {
      const { x, y } = action.payload;
      const updatedPoints = state.randomPoints.map((point) => ({
        ...point,
        selectedStart: point.x === x && point.y === y,
      }));
      const updatedCirclePoint = {
        ...state.circlePoint,
        selectedStart: state.circlePoint.x === x && state.circlePoint.y === y,
      };

      return {
        ...state,
        randomPoints: updatedPoints,
        circlePoint: updatedCirclePoint,
      };
    },
    setCirclePointZero: (state, action) => {
      state.circlePoint.selectedStart = action.payload;
    },
    setRandomPointsZero: (state, action) => {
      state.randomPoints = state.randomPoints.map((point) => ({
        ...point,
        selectedStart: action.payload,
      }));
    },
    setZeroStartCity: (state, action) => {
      const updatedPoints = state.randomPoints.map((point) => ({
        ...point,
        selectedStart: false
      }));
      const updatedCirclePoint = {
        ...state.circlePoint,
        selectedStart: false,
      };

      return {
        ...state,
        randomPoints: updatedPoints,
        circlePoint: updatedCirclePoint,
      };
    },
    setClickPossible: (state, action) => {
      state.clickPossible = !state.clickPossible;
    },
  },
});

export const {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClear,
  setSelectStartCity,
  setCirclePointZero,
  setRandomPointsZero,
  setZeroStartCity,
  setClickPossible
} = mapSlice.actions;

export default mapSlice.reducer;
