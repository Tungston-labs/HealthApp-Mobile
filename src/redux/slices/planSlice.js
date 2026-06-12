// redux/slices/planSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { planList } from "../../services/clientServices";

export const fetchPlansThunk = createAsyncThunk(
  "plans/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await planList();

      return res.data?.data || [];
    } catch (err) {
      console.log("PLAN FETCH ERROR:", err.response || err.message || err);

      return rejectWithValue(
        err?.response?.data?.message || "Plan fetch failed"
      );
    }
  }
);

const planSlice = createSlice({
  name: "plans",
  initialState: {
    loading: false,
    plans: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlansThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default planSlice.reducer;


