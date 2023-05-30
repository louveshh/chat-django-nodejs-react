import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMode: 'display',
  clickPossible: false
};

const toogleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
    toggleClickPossible: (state, action) => {
      state.clickPossible = action.payload;
    },
  },
});

export const { toggleActiveMode, toggleClickPossible } = toogleSlice.actions;

export default toogleSlice.reducer;
