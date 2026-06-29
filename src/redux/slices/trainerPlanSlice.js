import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableTrainersAPI } from '../../services/trainerServices';

export const fetchAvailableTrainersThunk = createAsyncThunk(
  'trainer/fetchAvailable',
  async (payload, { rejectWithValue }) => {
    // Basic sanity log for incoming payloads (helps diagnose 400s)
    console.log('🔎 fetchAvailableTrainersThunk payload:', JSON.stringify(payload));
    
    // Allow server to validate payload; still perform light validation to avoid trivially empty calls
    if (!payload || !payload.plan_id) {
      console.log('⛔ Missing plan_id in payload:', payload);
      return rejectWithValue('Invalid filter payload: plan_id required');
    }

    try {
      const response = await fetchAvailableTrainersAPI(payload);
      console.log("API RESPONSE", response.data);
      console.log(
  JSON.stringify(response.data.trainers, null, 2)
);
      return response.data;
    } catch (err) {
      console.log('❗ fetchAvailableTrainersThunk caught error:', err?.response?.status, err?.response?.data);
      return rejectWithValue(err?.response?.data || err?.message || 'Unknown error');
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
