import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi, logoutApi } from '../../services/authServices';
import { publicApi } from '../../services/api';
import { clearStorage } from '../../storage/asyncStorage';

export const loginClientThunk = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      const user = res.data?.data?.user;
      const access = res.data?.data?.access;
      const refresh = res.data?.data?.refresh;

      if (refresh) await AsyncStorage.setItem('refresh_token', refresh);
      if (user) await AsyncStorage.setItem('user', JSON.stringify(user));

      return { user, access };
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

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refresh = await AsyncStorage.getItem('refresh_token');

      if (refresh) {
        await logoutApi(refresh);
      }

      clearStorage();
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
      const refresh = await AsyncStorage.getItem('refresh_token');
      const userString = await AsyncStorage.getItem('user');
      if (!refresh || !userString) {
        return null;
      }

      const response = await publicApi.post('auth/token/refresh/', {
        refresh,
      });

      if (!response?.data?.data?.access) {
        throw new Error('Refresh failed');
      }
      return {
        user: JSON.parse(userString),
        access: response.data.data.access,
      };
    } catch (err) {
      await AsyncStorage.multiRemove(['refresh_token', 'user']);
      return rejectWithValue('Session expired');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    isLoggedIn: false,
    user: null,
    accessToken: null,
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
      state.accessToken = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
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
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
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
        state.accessToken = null;
      })
      .addCase(logoutThunk.rejected, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })

      .addCase(loadPersistedAuthState.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.user = action.payload.user;
        state.accessToken = action.payload.access;
        state.isLoggedIn = true;
      })
      .addCase(loadPersistedAuthState.rejected, state => {
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { resetAuthState, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
