import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestNutritionAPI } from "../../services/clientServices";

export const requestNutritionThunk = createAsyncThunk(
  "nutrition/request",
  async (payload, { rejectWithValue }) => {
    try {
      return await requestNutritionAPI(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit request"
      );
    }
  }
);

const nutritionRequestSlice = createSlice({
  name: "nutritionRequest",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetNutritionState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestNutritionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestNutritionThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(requestNutritionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetNutritionState } = nutritionRequestSlice.actions;
export default nutritionRequestSlice.reducer;
