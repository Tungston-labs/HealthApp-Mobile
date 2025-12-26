import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../services/authServices';
import { setToken } from '../../storage/asyncStorage';
import api from '../../services/api';

export const loginClientThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      return res.data;
    } catch (err) {
      console.log("LOGIN ERROR FULL:", err);

      if (err.response) {
        return rejectWithValue(
          err.response.data?.detail ||
          err.response.data?.email_or_phno?.[0] ||
          "Invalid credentials"
        );
      }

      if (err.request) {
        return rejectWithValue("Server not reachable. Check network.");
      }

      return rejectWithValue("Something went wrong");
    }
  }
);


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
      .addCase(loginClientThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
     .addCase(loginClientThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.isLoggedIn = true;
  state.user = action.payload?.user;

  console.log("DEBUG: Login Response Data ->", action.payload);

  const access = action.payload?.access || action.payload?.token || action.payload?.data?.access;
  const refresh = action.payload?.refresh || action.payload?.data?.refresh;

  if (access) {
    setToken(access, refresh);
    api.defaults.headers.Authorization = `Bearer ${access}`;
    console.log('🟢 Token successfully captured and applied');
  } else {
    console.error('🔴 LOGIN SUCCESS BUT NO TOKEN FOUND IN RESPONSE. Check backend keys.');
  }
})
      .addCase(loginClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
