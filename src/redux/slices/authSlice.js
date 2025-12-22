import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/authServices";
import { setToken } from "../../storage/asyncStorage";
                                     
export const loginClientThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);

      console.log("LOGIN STATUS ", res.status);
      console.log("LOGIN DATA ", res.data);

      return res.data;
    } catch (err) {
      console.log("LOGIN ERROR STATUS ", err?.response?.status);
      console.log("LOGIN ERROR DATA ", err?.response?.data);

      return rejectWithValue(
  err?.response?.data?.email_or_phno?.[0] ||
  err?.response?.data?.detail ||
  "Invalid email or password"
);

    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggedIn: false,
    user: null,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginClientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginClientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload?.user;

        const token = action.payload?.token;
        if (token) {
          setToken(token.access, token.refresh);
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
