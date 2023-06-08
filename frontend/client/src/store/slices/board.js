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
  isRunning: false,
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
    toggleRunning: (state, _) => {
      state.isRunning = !state.isRunning;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
  },
});

export const {
  setStart,
  setFinish,
  setGrid,
  toggleRunning,
  setSelectedOption,
  setAlgorithm,
  setStep,
} = boardSlice.actions;

export default boardSlice.reducer;
