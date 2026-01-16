// redux/slices/clientProfileEditSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfileApi } from "../../services/clientServices";

export const updateProfileThunk = createAsyncThunk(
  "profile/edit",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateProfileApi(payload);
      return response.data;
    } catch (err) {
      console.log("❌ PROFILE UPDATE ERROR 👉", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Profile update failed"
      );
    }
  }
);

const clientProfileEditSlice = createSlice({
  name: "profileEdit",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetProfileEditState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateProfileThunk.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileThunk.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ✅ CORRECT EXPORT */
export const { resetProfileEditState } = clientProfileEditSlice.actions;
export default clientProfileEditSlice.reducer;
