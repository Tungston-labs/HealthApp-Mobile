import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTrainerProfileApi,
  updateTrainerProfileApi,
} from "../../services/trainerServices";

/* ================= FETCH ================= */
export const fetchTrainerProfileThunk = createAsyncThunk(
  "trainerProfile/fetch",
  async (trainerId, { rejectWithValue }) => {
    try {
      return await fetchTrainerProfileApi(trainerId);
    } catch (err) {
      return rejectWithValue("Failed to load trainer profile");
    }
  }
);

/* ================= UPDATE ================= */
export const updateTrainerProfileThunk = createAsyncThunk(
  "trainerProfile/update",
  async ({ trainerId, data }, { rejectWithValue }) => {
    try {
      return await updateTrainerProfileApi(trainerId, data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Profile update failed"
      );
    }
  }
);

const trainerProfileSlice = createSlice({
  name: "trainerProfile",
  initialState: {
    loading: false,
    profile: null,
    error: null,
    updated: false,
  },
  reducers: {
    resetTrainerProfileState: state => {
      state.loading = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: builder => {
    builder
      // FETCH
      .addCase(fetchTrainerProfileThunk.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTrainerProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTrainerProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTrainerProfileThunk.pending, state => {
        state.loading = true;
        state.updated = false;
      })
      .addCase(updateTrainerProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updated = true;
      })
      .addCase(updateTrainerProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTrainerProfileState } =
  trainerProfileSlice.actions;

export default trainerProfileSlice.reducer;
