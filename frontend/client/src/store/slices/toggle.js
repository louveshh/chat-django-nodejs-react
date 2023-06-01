import { createSlice } from '@reduxjs/toolkit';
import { light, dark } from 'styles/theme';

const initialState = {
  activeMode: 'display',
  theme: {
    mode: light,
    name: 'light',
  },
  language: 'pl',
};

const toogleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
    changeTheme: (state, _) => {
      if (state.theme.name === 'light') {
        const darkTheme = {
          mode: dark,
          name: 'dark',
        };
        state.theme = darkTheme;
      } else {
        const lightTheme = {
          mode: light,
          name: 'light',
        };
        state.theme = lightTheme;
      }
    },
    changeLanguage: (state, _) => {
      if (state.language === 'pl') {
        state.language = 'en';
      } else {
        state.language = 'pl';
      }
    },
  },
});

export const { toggleActiveMode, changeTheme, changeLanguage } =
  toogleSlice.actions;

export default toogleSlice.reducer;
