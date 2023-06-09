import { createSlice } from '@reduxjs/toolkit';
import { configDisplay } from '../../config/config';

const initialState = {
  circlePoint: {
    x: configDisplay.DISPLAY_SIZE / 2,
    y: configDisplay.DISPLAY_SIZE / 2,
    weight: 0,
    selectedStart: false,
    name: 'click',
  },
  randomPoints: [],
  filteredCities: [],
  pathingInProgress: false,
  toClear: false,
  clickPossible: false,
  algorithm: '',
};

const mapSlice = createSlice({
  name: 'map',
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
    setClearMap: (state, action) => {
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
    setRandomPointsZero: (state, _) => {
      state.randomPoints = state.randomPoints.map((point) => ({
        ...point,
        selectedStart: false,
      }));
    },
    setZeroStartCity: (state, _) => {
      const updatedPoints = state.randomPoints.map((point) => ({
        ...point,
        selectedStart: false,
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
    setZeroStartCityFiltered: (state, _) => {
      state.filteredCities = [];
    },
    setToggleClickPossible: (state, _) => {
      state.clickPossible = !state.clickPossible;
    },
    setClickPossible: (state, action) => {
      state.clickPossible = action.payload;
    },
    setAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    setFilteredCities: (state, action) => {
      state.filteredCities = action.payload;
    },
  },
});

export const {
  setCirclePoint,
  setRandomPoints,
  setPathingInProgress,
  setClearMap,
  setSelectStartCity,
  setCirclePointZero,
  setRandomPointsZero,
  setZeroStartCity,
  setToggleClickPossible,
  setClickPossible,
  setAlgorithm,
  setFilteredCities,
  setFilteredCitiesStart,
  setZeroStartCityFiltered,
} = mapSlice.actions;

export default mapSlice.reducer;
