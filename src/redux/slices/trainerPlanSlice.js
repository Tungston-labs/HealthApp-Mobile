import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableTrainersAPI } from '../../services/trainerServices';

export const fetchAvailableTrainersThunk = createAsyncThunk(
  'trainer/fetchAvailable',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetchAvailableTrainersAPI(payload);
      return response.data; // must match backend response
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || 'Failed to fetch trainers'
      );
    }
  }
);

/* ✅ initialState MUST be outside */
const initialState = {
  trainers: [],
  plan: null,
  total: 0,
  filters: null,   // 👈 stores last applied filter
  loading: false,
  error: null,
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    clearTrainers: state => {
      state.trainers = [];
      state.plan = null;
      state.total = 0;
      state.filters = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAvailableTrainersThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTrainersThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.trainers =
          action.payload?.available_trainers ?? [];

        state.plan =
          action.payload?.plan ?? null;

        state.total =
          action.payload?.total_available ?? 0;

        /* ✅ STORE FILTER PAYLOAD */
        state.filters = action.meta.arg;
      })
      .addCase(fetchAvailableTrainersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrainers } = trainerSlice.actions;
export default trainerSlice.reducer;
