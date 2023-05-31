import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeMode: 'display',
};

const toogleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
  },
});

export const { toggleActiveMode } = toogleSlice.actions;

export default toogleSlice.reducer;
