import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { configDisplay } from 'config/config';
import { urls, urlsApi } from 'config/urls';
import { LoadingManager } from 'utils/toastify/loading';
import { configPaths } from 'config/paths';
import { logout } from './user';

const initialState = {
  ownSelectedCity: {
    x: configDisplay.DISPLAY_SIZE / 2,
    y: configDisplay.DISPLAY_SIZE / 2,
    weight: 0,
    selectedStart: false,
    name: 'click',
  },
  randomPoints: [],
  filteredCities: [],
  pathingInProgress: false,
  loading: false,
  toClear: false,
  clickPossible: false,
  algorithm: '',
  mouseMoveCity: null,
  biomes: null,
};

export const getMap = createAsyncThunk(urls.map, async (_, thunkAPI) => {
  const notify = new LoadingManager({ render: 'Getting cities...' });
  try {
    const res = await fetch(urlsApi.map, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      notify.updateLoading({
        render: 'Success! Cities Updated',
        type: 'success',
        isLoading: false,
      });
      return data;
    }
    notify.updateLoading({
      render: data.error,
      type: 'error',
      isLoading: false,
    });
    return thunkAPI.rejectWithValue(data);
  } catch (err) {
    notify.updateLoading({
      render: 'error',
      type: 'error',
      isLoading: false,
    });
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getBiomes = createAsyncThunk(
  urls.biomes,
  async (page, thunkAPI) => {
    const notify = new LoadingManager({
      render: 'Getting biomes...',
    });
    try {
      const res = await fetch(`${urlsApi.biomes}?page=${page}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        notify.updateLoading({
          render: 'Success! Biomes Updated',
          type: 'success',
          isLoading: false,
        });
        return data;
      }
      notify.updateLoading({
        render: data.error,
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const setAddOwnCity = createAsyncThunk(
  urls.add,
  async ({ email, x, y, name, weight }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      x,
      y,
      name,
      weight,
    });
    const notify = new LoadingManager({
      render: 'Adding own city...',
    });
    try {
      const res = await fetch(urlsApi.add, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await res.json();

      if (res.status === 201) {
        const { dispatch } = thunkAPI;
        dispatch(getMap());
        notify.updateLoading({
          render: 'Success! City added',
          type: 'success',
          isLoading: false,
        });
        return data;
      }
      if (res.status === 401) {
        const { dispatch } = thunkAPI;
        dispatch(logout());
        notify.updateLoading({
          render: 'session ended, cookies are gone',
          type: 'error',
          isLoading: false,
        });
        setTimeout(() => {
          window.location.href = configPaths.login;
        }, 4000);
        return;
      }
      notify.updateLoading({
        render: data.error,
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const setRemoveOwnCity = createAsyncThunk(
  urls.remove,
  async ({ email }, thunkAPI) => {
    const body = JSON.stringify({
      email,
    });
    const notify = new LoadingManager({
      render: 'Removing own city...',
    });
    try {
      const res = await fetch(urlsApi.remove, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        dispatch(getMap());
        notify.updateLoading({
          render: 'Success! City removed',
          type: 'success',
          isLoading: false,
        });
        if (res.status === 401) {
          const { dispatch } = thunkAPI;
          dispatch(logout());
          notify.updateLoading({
            render: 'session ended, cookies are gone',
            type: 'error',
            isLoading: false,
          });
          setTimeout(() => {
            window.location.href = configPaths.login;
          }, 4000);
          return;
        }

        return data;
      }
      notify.updateLoading({
        render: data.error,
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOwnSelectedCity: (state, action) => {
      state.ownSelectedCity = action.payload;
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
      const updatedOwnSelectedCity = {
        ...state.ownSelectedCity,
        selectedStart:
          state.ownSelectedCity.x === x && state.ownSelectedCity.y === y,
      };

      return {
        ...state,
        randomPoints: updatedPoints,
        ownSelectedCity: updatedOwnSelectedCity,
      };
    },
    setOwnSelectedCityZero: (state, action) => {
      state.ownSelectedCity.selectedStart = action.payload;
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
      const updatedOwnSelectedCity = {
        ...state.ownSelectedCity,
        selectedStart: false,
      };

      return {
        ...state,
        randomPoints: updatedPoints,
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
        state.randomPoints = action.payload;
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
  setRandomPoints,
  setPathingInProgress,
  setClearMap,
  setSelectStartCity,
  setOwnSelectedCityZero,
  setRandomPointsZero,
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
