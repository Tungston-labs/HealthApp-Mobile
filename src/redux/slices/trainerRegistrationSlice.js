// trainerRegistrationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerTrainerApi } from "../../services/trainerServices";

export const registerTrainerThunk = createAsyncThunk(
  "trainer/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await registerTrainerApi(payload);
      return response.data;
    } catch (err) {
  console.log(" TRAINER REGISTER ERROR:", {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data,
  });
  return rejectWithValue(
    err.response?.data || err.message || "Network error"
  );
}
  }
);

const trainerRegistrationSlice = createSlice({
  name: "trainerReg",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetTrainerRegisterState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerTrainerThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTrainerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(registerTrainerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Registration failed";
      });
  },
});

export const { resetTrainerRegisterState } = trainerRegistrationSlice.actions;

export default trainerRegistrationSlice.reducer;
