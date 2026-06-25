import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompletedSessionDetailApi } from "../../services/SessionHistoryServices";

export const fetchCompletedSessionDetailThunk = createAsyncThunk(
  "completedSessionDetail/fetch",
  async (sectionId, { rejectWithValue }) => {
    try {
      const response = await fetchCompletedSessionDetailApi(sectionId);
      console.log("🟢 SINGLE SESSION RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch completed session details"
      );
    }
  }
);

const completedSessionDetailSlice = createSlice({
  name: "completedSessionDetail",
  initialState: {
    session: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCompletedSessionDetail: (state) => {
      state.session = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedSessionDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.session = null;
      })
      .addCase(fetchCompletedSessionDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload; 
      })
      .addCase(fetchCompletedSessionDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCompletedSessionDetail } =
  completedSessionDetailSlice.actions;

export default completedSessionDetailSlice.reducer;
