import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTrainerProfileApi,
  updateTrainerProfileApi,
} from "../../services/trainerServices";

/* FETCH */
export const fetchTrainerProfileThunk = createAsyncThunk(
  "trainerProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTrainerProfileApi();
    } catch {
      return rejectWithValue("Failed to load profile");
    }
  }
);

/* UPDATE */
export const updateTrainerProfileThunk = createAsyncThunk(
  "trainerProfile/update",
  async (data, { rejectWithValue }) => {
    try {
      return await updateTrainerProfileApi(data);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
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
  reducers: {},
  extraReducers: builder => {
    builder
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

      .addCase(updateTrainerProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.updated = true;
      });
  },
});

export default trainerProfileSlice.reducer;
