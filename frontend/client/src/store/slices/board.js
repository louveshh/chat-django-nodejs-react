import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  grid: [], // Array representing the grid of nodes
  startNode: null, // Object representing the start node
  finishNode: null, // Object representing the finish node
  isRunning: false, // Flag indicating if the algorithm is running
  isWallNode: false,
  // Other relevant state properties
};

const pathfindingSlice = createSlice({
  name: 'pathfinding',
  initialState,
  reducers: {
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setStartNode: (state, action) => {
      const { row, col, isStart, prevRow, prevCol } = action.payload;
      if (isStart) {
        state.startNode = { row, col };
      } else {
        // Reset the previous start node if it's different from the current one
        if (state.startNode && (prevRow !== row || prevCol !== col)) {
          state.grid[prevRow][prevCol].isStart = false;
        }
        state.startNode = null;
      }
      state.grid[row][col].isStart = isStart;
    },
    setFinishNode: (state, action) => {
      const { row, col, isFinish, prevRow, prevCol } = action.payload;
      if (isFinish) {
        state.finishNode = { row, col };
      } else {
        // Reset the previous finish node if it's different from the current one
        if (state.finishNode && (prevRow !== row || prevCol !== col)) {
          state.grid[prevRow][prevCol].isFinish = false;
        }
        state.finishNode = null;
      }
      state.grid[row][col].isFinish = isFinish;
    },
    toggleWallNode: (state, action) => {
      const { row, col } = action.payload;
      state.grid[row][col].isWall = !state.grid[row][col].isWall;
    },
    toggleIsRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    // Other relevant reducer functions
  },
});

export const {
  setGrid,
  setStartNode,
  setFinishNode,
  toggleWallNode,
  toggleIsRunning,
} = pathfindingSlice.actions;

export default pathfindingSlice.reducer;