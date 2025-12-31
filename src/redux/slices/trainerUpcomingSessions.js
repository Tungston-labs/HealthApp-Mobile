import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainerService from "../../services/trainerServices";

const initialState = {
  bookings: [],
  count: 0,
  next: null,
  previous: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

/* 🔄 Async thunk */
export const fetchTrainerBookings = createAsyncThunk(
  "trainer/fetchBookings",
  async (params, thunkAPI) => {
    try {
      return await trainerService.getTrainerBookings(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch bookings"
      );
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    resetTrainerBookings: (state) => {
      state.bookings = [];
      state.count = 0;
      state.next = null;
      state.previous = null;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainerBookings.fulfilled, (state, action) => {
  state.isLoading = false;
  state.bookings = action.payload.results;     // ✅ FIX
  state.count = action.payload.total_items;    // ✅ FIX
  state.next = action.payload.next;
  state.previous = action.payload.previous;
})

      .addCase(fetchTrainerBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetTrainerBookings } = trainerSlice.actions;
export default trainerSlice.reducer;
