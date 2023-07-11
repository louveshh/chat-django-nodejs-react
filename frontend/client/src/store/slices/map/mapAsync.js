import { createAsyncThunk } from '@reduxjs/toolkit';
import { urls, urlsApi } from 'config/urls';
import { LoadingManager } from 'utils/toastify/loading';
import { configPaths } from 'config/paths';
import { logout } from 'store/slices/user/userAsync';
import { formatError } from 'utils/common/formatError';

export const getMap = createAsyncThunk(urls.map, async (_, thunkAPI) => {
  const notify = new LoadingManager({ render: 'Getting Cities...' });
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
      render: data.error ? formatError(data.error) : 'Unknown Error',
      type: 'error',
      isLoading: false,
    });
    return thunkAPI.rejectWithValue(data);
  } catch (err) {
    notify.updateLoading({
      render: 'Unknown Error',
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
      render: 'Getting Biomes...',
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
        render: data.error ? formatError(data.error) : 'Unknown Error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'Unknown Error',
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
        dispatch(getBiomes());
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
          render: 'Session Ended, Cookies Are Gone',
          type: 'error',
          isLoading: false,
        });
        setTimeout(() => {
          window.location.href = configPaths.login;
        }, 8000);
        return;
      }
      notify.updateLoading({
        render: data.error ? formatError(data.error) : 'Unknown Error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'Unknown Error',
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
        dispatch(getBiomes());
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
          }, 7000);
          return;
        }

        return data;
      }
      notify.updateLoading({
        render: data.error ? formatError(data.error) : 'Unknown Error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(data);
    } catch (err) {
      notify.updateLoading({
        render: 'Unknown Error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
