import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAvailableTrainersAPI } from "../../services/trainerServices";

export const fetchAvailableTrainersThunk = createAsyncThunk(
  "trainer/fetchAvailable",
  async (payload, { rejectWithValue }) => {
    try {
      return await fetchAvailableTrainersAPI(payload);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch trainers");
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainers: [],
    plan: null,
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTrainersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTrainersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload.available_trainers;
        state.plan = action.payload.plan;
        state.total = action.payload.total_available;
      })
      .addCase(fetchAvailableTrainersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trainerSlice.reducer;
