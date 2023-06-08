import { createSlice } from '@reduxjs/toolkit';
import { configBoard } from '../../config/config';

const initialState = {
  points: {
    startRow: 5,
    finishRow: 5,
    startCol: 5,
    finishCol: 15,
  },
  grid: [],
  pathingInProgress: false,
  toClear: false,
  selectedOption: configBoard.defaultDrawOption,
  algorithm: '',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setStart: (state, action) => {
      const { x, y } = action.payload;
      state.points = { ...state.points, startRow: x, startCol: y };
    },
    setFinish: (state, action) => {
      const { x, y } = action.payload;
      state.points = { ...state.points, finishRow: x, finishCol: y };
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setToggleRunning: (state, _) => {
      state.pathingInProgress = !state.pathingInProgress;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    setClearBoard: (state, action) => {
      state.toClear = action.payload;
    },
  },
});

export const {
  setStart,
  setFinish,
  setGrid,
  setToggleRunning,
  setSelectedOption,
  setAlgorithm,
  setStep,
  setClearBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
