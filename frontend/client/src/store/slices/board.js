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
    setStartRow: (state, action) => {
      state.points.startRow = action.payload;
    },
    setFinishRow: (state, action) => {
      state.points.finishRow = action.payload;
    },
    setStartCol: (state, action) => {
      state.points.startCol = action.payload;
    },
    setFinishCol: (state, action) => {
      state.points.finishCol = action.payload;
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
  setStartRow,
  setFinishRow,
  setStartCol,
  setFinishCol,
  setGrid,
  toggleRunning,
  setSelectedOption,
  setAlgorithm,
  setStep,
} = boardSlice.actions;

export default boardSlice.reducer;
