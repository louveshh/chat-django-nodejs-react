import { createSlice } from '@reduxjs/toolkit';
import { configDisplay } from 'config/config';
import { setAddOwnCity, setRemoveOwnCity, getMap, getBiomes } from './mapAsync';

const initialState = {
  ownSelectedCity: {
    x: configDisplay.DISPLAY_SIZE / 2,
    y: configDisplay.DISPLAY_SIZE / 2,
    weight: 0,
    selectedStart: false,
    name: null,
  },
  cityPoints: [],
  filteredCities: [],
  pathingInProgress: false,
  loading: false,
  toClear: false,
  clickPossible: false,
  algorithm: '',
  mouseMoveCity: null,
  biomes: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOwnSelectedCity: (state, action) => {
      state.ownSelectedCity = { ...state.ownSelectedCity, ...action.payload };
    },
    setcityPoints: (state, action) => {
      state.cityPoints = action.payload;
    },
    setPathingInProgress: (state, action) => {
      state.pathingInProgress = action.payload;
    },
    setClearMap: (state, action) => {
      state.toClear = action.payload;
    },
    setSelectStartCity: (state, action) => {
      const { x, y } = action.payload;
      const updatedPoints = state.cityPoints.map((point) => ({
        ...point,
        selectedStart: point.x === x && point.y === y,
      }));
      const updatedOwnSelectedCity = {
        ...state.ownSelectedCity,
        selectedStart:
          state.ownSelectedCity.x === x && state.ownSelectedCity.y === y,
      };

      return {
        ...state,
        cityPoints: updatedPoints,
        ownSelectedCity: updatedOwnSelectedCity,
      };
    },
    setOwnSelectedCityZero: (state, action) => {
      state.ownSelectedCity.selectedStart = action.payload;
    },
    setcityPointsZero: (state, _) => {
      state.cityPoints = state.cityPoints.map((point) => ({
        ...point,
        selectedStart: false,
      }));
    },
    setZeroStartCity: (state, _) => {
      const updatedPoints = state.cityPoints.map((point) => ({
        ...point,
        selectedStart: false,
      }));
      const updatedOwnSelectedCity = {
        ...state.ownSelectedCity,
        selectedStart: false,
      };

      return {
        ...state,
        cityPoints: updatedPoints,
        ownSelectedCity: updatedOwnSelectedCity,
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
    setMouseMoveCity: (state, action) => {
      state.mouseMoveCity = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAddOwnCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAddOwnCity.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(setAddOwnCity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setRemoveOwnCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(setRemoveOwnCity.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(setRemoveOwnCity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMap.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMap.fulfilled, (state, action) => {
        state.loading = false;
        state.cityPoints = action.payload;
      })
      .addCase(getMap.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBiomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBiomes.fulfilled, (state, action) => {
        state.loading = false;
        state.biomes = action.payload;
      })
      .addCase(getBiomes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setOwnSelectedCity,
  setcityPoints,
  setPathingInProgress,
  setClearMap,
  setSelectStartCity,
  setOwnSelectedCityZero,
  setcityPointsZero,
  setZeroStartCity,
  setToggleClickPossible,
  setClickPossible,
  setAlgorithm,
  setFilteredCities,
  setFilteredCitiesStart,
  setZeroStartCityFiltered,
  setMouseMoveCity,
} = mapSlice.actions;

export default mapSlice.reducer;
