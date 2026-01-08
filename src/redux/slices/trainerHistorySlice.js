import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrainerHistory } from "../../services/trainerServices";

export const getTrainerHistory = createAsyncThunk(
  "trainerHistory/getTrainerHistory",
  async (page, { rejectWithValue }) => {
    try {
      const data = await fetchTrainerHistory(page);

      console.log("✅ THUNK DATA:", data);

      return data;
    } catch (error) {
      console.log("❌ THUNK ERROR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const trainerHistorySlice = createSlice({
  name: "trainerHistory",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    resetTrainerHistory: (state) => {
      state.sessions = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrainerHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrainerHistory.fulfilled, (state, action) => {
        console.log("Trainer history API payload:", action.payload);

        state.loading = false;
        state.sessions = [
          ...state.sessions,
          ...action.payload.results,
        ];
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.total_pages;
      })

      .addCase(getTrainerHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTrainerHistory } = trainerHistorySlice.actions;
export default trainerHistorySlice.reducer;
