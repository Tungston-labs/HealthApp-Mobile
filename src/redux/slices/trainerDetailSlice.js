import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrainerDetailAPI } from "../../services/trainerServices";

export const fetchTrainerDetailThunk = createAsyncThunk(
  "trainerDetail/fetch",
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await fetchTrainerDetailAPI(trainerId);
      console.log("TRAINER DETAIL API DATA 👉", response);
      // Return first trainer object
      return response.data?.[0] ?? null;
    } catch (err) {
      console.log("DETAIL ERROR 👉", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to load trainer details"
      );
    }
  }
);




const trainerDetailSlice = createSlice({
  name: "trainerDetail",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    resetTrainerDetail: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTrainerDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTrainerDetail } = trainerDetailSlice.actions;
export default trainerDetailSlice.reducer;
