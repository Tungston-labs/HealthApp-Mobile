import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { availableTrainers } from "../../services/trainerServices";

export const fetchAvailableTrainers = createAsyncThunk(
  "trainer/available",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await availableTrainers(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainers: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTrainers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload;
      });
  },
});

export default trainerSlice.reducer;
