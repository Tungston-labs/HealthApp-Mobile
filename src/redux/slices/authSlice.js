import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi, logoutApi } from '../../services/authServices';
import api, { publicApi } from '../../services/api';
import { clearStorage } from '../../storage/asyncStorage';

export const loginClientThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);

      const user = res.data?.data?.user;
      const access = res.data?.data?.access;
      const refresh = res.data?.data?.refresh;

      // 🚨 TRAINER STATUS CHECK
      if (user?.role === "trainer" && user?.trainer?.status !== "approved") {
        return rejectWithValue(
          `Your account is ${user.trainer.status}. Please wait for approval.`
        );
      }

      if (refresh) await AsyncStorage.setItem("refresh_token", refresh);
      if (user) await AsyncStorage.setItem("user", JSON.stringify(user));

      return { user, access };
    } catch (err) {
  const data = err.response?.data;

  if (!err.response) {
    return rejectWithValue(
      "Unable to connect to server. Please try again."
    );
  }

  const errorMessage =
    data?.errors?.non_field_errors?.[0] ||
    data?.errors?.email?.[0] ||
    data?.errors?.password?.[0] ||
    data?.error ||
    data?.message ||
    data?.detail ||
    `Server error (${err.response.status})`;

  return rejectWithValue(errorMessage);
}
  }
);

// authSlice.js
export const fetchTrainerStatusThunk = createAsyncThunk(
  "auth/fetchTrainerStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trainer/status/");
      console.log("TRAINER STATUS API:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
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
    role: null,
    isVerified: true,
    trainerStatus: null,
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
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.isLoggedIn = true;
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

        if (!action.payload || !action.payload.user) {
          // 🚨 safety guard
          state.isLoggedIn = false;
          state.error = "Account not approved yet";
          return;
        }

        const user = action.payload.user;

        state.isLoggedIn = true;
        state.user = user;
        state.accessToken = action.payload.access;
        state.role = user?.role;

        if (user?.role === "trainer") {
          state.trainerStatus = user?.trainer?.status;
          state.isVerified = user?.trainer?.status === "approved";
        } else {
          state.trainerStatus = null;
          state.isVerified = true;
        }
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
        state.isVerified = true;
        state.role = null;
      })
      .addCase(logoutThunk.rejected, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(loadPersistedAuthState.fulfilled, (state, action) => {
        if (!action.payload) return;

        const user = action.payload.user;

        state.loading = false;
        state.isLoggedIn = true;
        state.user = user;
        state.accessToken = action.payload.access;
        state.role = user?.role;

        if (user?.role === "trainer") {
          state.trainerStatus = user?.trainer?.status; // approved / pending
          state.isVerified = user?.trainer?.status === "approved";
        } else {
          state.trainerStatus = null;
          state.isVerified = true;
        }

      })
      .addCase(fetchTrainerStatusThunk.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTrainerStatusThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.trainerStatus =
          action.payload.trainerStatus || action.payload.status;
      })
      .addCase(fetchTrainerStatusThunk.rejected, state => {
        state.loading = false;
      });

  },
});

export const { resetAuthState, logout, setAccessToken, setAuth } = authSlice.actions;
export default authSlice.reducer;
