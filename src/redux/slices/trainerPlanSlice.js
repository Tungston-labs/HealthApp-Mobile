import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableTrainersAPI } from '../../services/trainerServices';

export const fetchAvailableTrainersThunk = createAsyncThunk(
  'trainer/fetchAvailable',
  async (payload, { rejectWithValue }) => {
    if (
      !payload?.plan_id ||
      !payload?.slot_days ||
      !payload?.time ||
      !payload?.start_date
    ) {
      console.log('⛔ BLOCKED EMPTY PAYLOAD:', payload);
      return rejectWithValue('Invalid filter payload');
    }

    try {
      const response = await fetchAvailableTrainersAPI(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const initialState = {
  trainers: [],
  plan: null,
  total: 0,
  filters: null,
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
      state.loading = false;
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

        state.trainers = action.payload?.trainers ?? [];
        state.plan = action.payload?.plan ?? null;
        state.total = action.payload?.total_available ?? 0;

        // ✅ Preserve slot filters
        if (action.meta.arg?.slot_days) {
          state.filters = action.meta.arg;
        }
      })

      .addCase(fetchAvailableTrainersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrainers } = trainerSlice.actions;
export default trainerSlice.reducer;
