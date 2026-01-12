import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientTrainersAPI } from "../../services/trainerServices";

/* -------------------- THUNK -------------------- */
export const fetchClientTrainersThunk = createAsyncThunk(
  "clientTrainer/fetch",
  async (payload = {}, { rejectWithValue }) => {
    try {
      const response = await fetchClientTrainersAPI(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch client trainers"
      );
    }
  }
);

/* -------------------- INITIAL STATE -------------------- */
const initialState = {
  trainers: [],
  plan: null,
  total: 0,
  loading: false,
  error: null,
};

/* -------------------- SLICE -------------------- */
const clientTrainerSlice = createSlice({
  name: "clientTrainer",
  initialState,
  reducers: {
    clearClientTrainers: (state) => {
      state.trainers = [];
      state.plan = null;
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTrainersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientTrainersThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.trainers =
          action.payload?.available_trainers ?? [];

        state.plan =
          action.payload?.plan ?? null;

        state.total =
          action.payload?.total_available ?? 0;
      })
      .addCase(fetchClientTrainersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearClientTrainers } = clientTrainerSlice.actions;
export default clientTrainerSlice.reducer;
