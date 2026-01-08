import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, logoutApi } from "../../services/authServices";
import { setToken } from "../../storage/asyncStorage";
import api from "../../services/api";

/* =========================
   LOGIN THUNK
========================= */
export const loginClientThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      return res.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(
          err.response.data?.detail ||
          err.response.data?.email_or_phno?.[0] ||
          "Invalid credentials"
        );
      }
      if (err.request) {
        return rejectWithValue("Server not reachable");
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

/* =========================
   LOGOUT THUNK
========================= */
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = await AsyncStorage.getItem("refresh_token");

      if (refresh) {
        await logoutApi(refresh);
      }

      await AsyncStorage.multiRemove([
        "access_token",
        "refresh_token",
        "user",
      ]);

      delete api.defaults.headers.Authorization;

      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
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

        const user = action.payload?.data?.user;
        const access = action.payload?.data?.access;
        const refresh = action.payload?.data?.refresh;

        state.user = user;

        if (access) {
          setToken(access, refresh);
          api.defaults.headers.Authorization = `Bearer ${access}`;
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
      })
      .addCase(logoutThunk.rejected, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
