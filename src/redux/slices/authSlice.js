import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../services/authServices';
import { setToken } from '../../storage/asyncStorage';

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

        const access = action.payload?.access;
        const refresh = action.payload?.refresh;

        if (access) {
          setToken(access, refresh);
          console.log('🟢 TOKEN SAVED FROM SLICE');
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
