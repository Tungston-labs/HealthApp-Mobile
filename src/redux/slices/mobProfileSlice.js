import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMobProfileApi } from "../../services/clientServices";

/* 🔹 FETCH MOBILE PROFILE */
export const fetchMobProfileThunk = createAsyncThunk(
  "mobProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMobProfileApi();
      return response.data; // 👈 only profile object
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

const mobProfileSlice = createSlice({
  name: "mobProfile",
  initialState: {
    loading: false,
    profile: null,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMobProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMobProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mobProfileSlice.reducer;