import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChangeTrainer } from "../../services/trainerServices";

export const fetchChangeTrainerThunk = createAsyncThunk(
  "trainerChange/fetch",
  async (trainerId, { rejectWithValue }) => {
    try {
      const data = await fetchChangeTrainer(trainerId);
      console.log("🟢 CHANGE TRAINER RESPONSE:", data);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const trainerChangeSlice = createSlice({
  name: "trainerChange",
  initialState: {
    trainers: [],
    plan: null,
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetTrainerChange: (state) => {
      state.trainers = [];
      state.plan = null;
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChangeTrainerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChangeTrainerThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.trainers = action.payload?.trainers ?? [];
        state.plan = action.payload?.plan ?? null;
        state.total = action.payload?.total_available ?? 0;
      })
      .addCase(fetchChangeTrainerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTrainerChange } = trainerChangeSlice.actions;
export default trainerChangeSlice.reducer;
