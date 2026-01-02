import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { verifyOtp } from "../../services/authServices";

export const verifyOtpAction = createAsyncThunk(
  "otp/verify",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await verifyOtp(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  }
);

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetOtpState } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
