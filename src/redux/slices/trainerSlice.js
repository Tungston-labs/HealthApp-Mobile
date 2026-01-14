import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrainerDetailService,
  cancelTrainingService,
  reportTrainerService,
} from "../../services/trainerServices";


export const fetchTrainerDetailThunk = createAsyncThunk(
  "trainer/fetchDetail",
  async (trainerId, { rejectWithValue }) => {
    try {
      const res = await getTrainerDetailService(trainerId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch trainer details"
      );
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    loading: false,
    trainer: null,
    error: null,

    cancelLoading: false,
    reportLoading: false,
  },
  reducers: {
    resetTrainerState: (state) => {
      state.loading = false;
      state.trainer = null;
      state.error = null;
      state.cancelLoading = false;
      state.reportLoading = false;
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
        state.trainer = action.payload;
      })
      .addCase(fetchTrainerDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetTrainerState } = trainerSlice.actions;
export default trainerSlice.reducer;
