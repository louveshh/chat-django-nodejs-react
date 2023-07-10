/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const getUser = createAsyncThunk(urls.me, async (_, thunkAPI) => {
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

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
