import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompletedSessionsApi } from "../../services/SessionHistoryServices";

export const fetchCompletedSessionsThunk = createAsyncThunk(
  "completedSessions/fetch",
  async (page = 1, { rejectWithValue }) => {
    try {
      return await fetchCompletedSessionsApi(page);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch completed sessions"
      );
    }
  }
);
const completedSessionsSlice = createSlice({
  name: "completedSessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      next: null,
      previous: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedSessionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedSessionsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.sessions = action.payload.results.sessions;

        state.pagination.totalItems = action.payload.total_items;
        state.pagination.totalPages = action.payload.total_pages;
        state.pagination.currentPage = action.payload.current_page;
        state.pagination.next = action.payload.next;
        state.pagination.previous = action.payload.previous;
      })
      .addCase(fetchCompletedSessionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default completedSessionsSlice.reducer;


export const { resetCompletedSessions } = completedSessionsSlice.actions;
