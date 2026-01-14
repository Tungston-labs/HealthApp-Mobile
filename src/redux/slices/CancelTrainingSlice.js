import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {ClientCancelTraining} from "../../services/clientServices"
export const cancelTrainingThunk = createAsyncThunk(
  "training/cancel",
  async (_, { rejectWithValue }) => {
    try {
      const data = await ClientCancelTraining();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Cancel request failed"
      );
    }
  }
);

const cancelTrainingSlice = createSlice({
  name: "cancelTraining",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCancelState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelTrainingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelTrainingThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelTrainingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCancelState } = cancelTrainingSlice.actions;
export default cancelTrainingSlice.reducer;
