import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUnbookedPlans } from "../../services/clientServices";

/**
 * Fetch unbooked plans from backend
 */
export const fetchUnbookedPlansThunk = createAsyncThunk(
  "unbookedplans/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUnbookedPlans();
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);

const unbookedPlanSlice = createSlice({
  name: "unbookedplans",
  initialState: {
    loading: false,
    plans: [],
    error: null,
  },
  reducers: {
    /**
     * Remove selected plan immediately after success
     */
    removePlanFromList: (state, action) => {
      state.plans = state.plans.filter(
        (plan) => plan.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnbookedPlansThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnbookedPlansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchUnbookedPlansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removePlanFromList } = unbookedPlanSlice.actions;
export default unbookedPlanSlice.reducer;
