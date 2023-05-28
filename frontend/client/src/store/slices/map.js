import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circlePoint: { x: 30, y: 30, weight: 0 },
  randomPoints: [],
  pathingInProgress: false,
  clear: false,
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
      state.clear = action.payload;
    },
  },
});

export const {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClear,
} = mapSlice.actions;

export default mapSlice.reducer;
