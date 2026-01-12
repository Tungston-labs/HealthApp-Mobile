import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi, logoutApi } from '../../services/authServices';
import { setToken } from '../../storage/asyncStorage';
import api from '../../services/api';

/* =========================
   LOGIN THUNK
========================= */
export const loginClientThunk = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      const user = res.data?.data?.user;
      const access = res.data?.data?.access;
      const refresh = res.data?.data?.refresh;

      if (access) {
        await setToken(access, refresh);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.Authorization = `Bearer ${access}`;
      }

      return user;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(
          err.response.data?.detail ||
            err.response.data?.email_or_phno?.[0] ||
            'Invalid credentials',
        );
      }
      if (err.request) {
        return rejectWithValue('Server not reachable');
      }
      return rejectWithValue('Something went wrong');
    }
  },
);

/* =========================
   LOGOUT THUNK
========================= */
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refresh = await AsyncStorage.getItem('refresh_token');

      if (refresh) {
        await logoutApi(refresh);
      }

      await AsyncStorage.multiRemove([
        'access_token',
        'refresh_token',
        'user',
        'active_session',
      ]);

      delete api.defaults.headers.Authorization;

      return true;
    } catch (err) {
      return rejectWithValue('Logout failed');
    }
  },
);

export const loadPersistedAuthState = createAsyncThunk(
  'auth/loadPersisted',
  async (_, { rejectWithValue }) => {
    try {
      const access = await AsyncStorage.getItem('access_token');
      const userString = await AsyncStorage.getItem('user');

      if (access && userString) {
        const user = JSON.parse(userString);
        api.defaults.headers.Authorization = `Bearer ${access}`;
        return { user, isLoggedIn: true };
      }

      return { user: null, isLoggedIn: false };
    } catch (err) {
      return rejectWithValue('Failed to load persisted auth state');
    }
  },
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isLoggedIn: false,
    user: null,
    error: null,
  },
  reducers: {
    resetAuthState: state => {
      state.loading = false;
      state.error = null;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      /* LOGIN */
      .addCase(loginClientThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutThunk.pending, state => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })

      .addCase(loadPersistedAuthState.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.user = action.payload.user;
      })
      .addCase(loadPersistedAuthState.rejected, state => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
