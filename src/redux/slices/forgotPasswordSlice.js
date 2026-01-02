import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPasswordStep } from "../../services/authServices";

export const forgotPasswordThunk = createAsyncThunk(
  "forgotPassword/step1",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordStep(payload);
      return response.data;

    } catch (error) {
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
        state.success = false;
        state.error = null;      
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.detail ||
          "OTP sent successfully";
        state.error = null;     
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetForgotPasswordState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
