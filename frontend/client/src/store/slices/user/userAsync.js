/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { urls, urlsApi } from 'config/urls';
import { LoadingManager } from 'utils/toastify/loading';

export const register = createAsyncThunk(
  urls.register,
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });
    const notify = new LoadingManager({ render: 'Trying To Register...' });
    try {
      const res = await fetch(urlsApi.register, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      const data = await res.json();

      if (res.status === 201) {
        notify.updateLoading({
          render: 'Success! Registered',
          type: 'success',
          isLoading: false,
        });
        return data;
      }
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

export const getUser = createAsyncThunk(urls.me, async (_, thunkAPI) => {
  const notify = new LoadingManager({ render: 'Getting User Data...' });
  try {
    const res = await fetch(urlsApi.me, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      notify.updateLoading({
        render: 'Success! User Data Fetched',
        type: 'success',
        isLoading: false,
      });
      return data;
    }
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

export const login = createAsyncThunk(
  urls.login,
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });
    const notify = new LoadingManager({ render: 'Trying To Log In...' });
    try {
      const res = await fetch(urlsApi.login, {
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
        dispatch(getUser());

        notify.updateLoading({
          render: 'Success! Logged In',
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
        render: 'Unknown Error',
        type: 'error',
        isLoading: false,
      });
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(urls.verify, async (_, thunkAPI) => {
  try {
    const res = await fetch(urlsApi.verify, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    }
    return thunkAPI.rejectWithValue(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk(urls.logout, async (_, thunkAPI) => {
  const notify = new LoadingManager({ render: 'Trying To Logging Out...' });
  try {
    const res = await fetch(urlsApi.logout, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      notify.updateLoading({
        render: 'Success! Logged Out',
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
      render: 'Unknown Error',
      type: 'error',
      isLoading: false,
    });
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
