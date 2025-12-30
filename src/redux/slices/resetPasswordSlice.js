import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../../services/authServices";

// Async thunk for reset password
export const resetPasswordAction = createAsyncThunk(
  "resetPassword/reset",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Reset password payload:", payload);
      const response = await resetPassword(payload);
      console.log("Reset password response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Reset password error:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else if (error.message) {
        return rejectWithValue({ message: error.message });
      } else {
        return rejectWithValue({ message: "Something went wrong" });
      }
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
