import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordStep } from "../../services/authServices";

export const forgotPasswordThunk = createAsyncThunk(
  "forgotPassword/step1",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordStep(payload);

      if (response?.data?.detail) {
        return response.data;
      }

      return rejectWithValue("Failed to send OTP");
    } catch (error) {
      if (error?.response?.status === 200) {
        return { detail: "OTP sent to email" };
      }

      const data = error?.response?.data;

      return rejectWithValue(
        data?.detail ||
        data?.email?.[0] ||
        "Failed to send OTP"
      );
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.detail;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
