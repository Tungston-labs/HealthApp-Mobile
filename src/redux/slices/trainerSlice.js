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


export const cancelTrainingThunk = createAsyncThunk(
  "trainer/cancelTraining",
  async (trainerId, { rejectWithValue }) => {
    try {
      const res = await cancelTrainingService(trainerId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Cancel training failed"
      );
    }
  }
);

export const reportTrainerThunk = createAsyncThunk(
  "trainer/reportTrainer",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await reportTrainerService(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Report submission failed"
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

      .addCase(cancelTrainingThunk.pending, (state) => {
        state.cancelLoading = true;
      })
      .addCase(cancelTrainingThunk.fulfilled, (state) => {
        state.cancelLoading = false;
        state.trainer = null; 
      })
      .addCase(cancelTrainingThunk.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      })

      .addCase(reportTrainerThunk.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(reportTrainerThunk.fulfilled, (state) => {
        state.reportLoading = false;
      })
      .addCase(reportTrainerThunk.rejected, (state, action) => {
        state.reportLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTrainerState } = trainerSlice.actions;
export default trainerSlice.reducer;
