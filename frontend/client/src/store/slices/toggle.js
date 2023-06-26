import { createSlice } from '@reduxjs/toolkit';
import { light, dark } from 'styles/theme';

const initialState = {
  activeMode: 'combo',
  theme: {
    mode: light,
    name: 'light',
  },
  language: '',
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggleActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
    setChangeTheme: (state, _) => {
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
    setChangeLanguage: (state, _) => {
      if (state.language === 'pl') {
        state.language = 'en';
      } else {
        state.language = 'pl';
      }
    },
  },
});

export const { setToggleActiveMode, setChangeTheme, setChangeLanguage } =
  toggleSlice.actions;

export default toggleSlice.reducer;
