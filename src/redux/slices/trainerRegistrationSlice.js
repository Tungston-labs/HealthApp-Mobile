import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerTrainerApi } from "../../services/trainerServices";

export const registerTrainerThunk = createAsyncThunk(
  "trainer/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerTrainerApi(formData);
      return response.data;
    } catch (error) {
  console.log("TRAINER REGISTER ERROR FULL ↓↓↓");
  console.log("AXIOS ERROR OBJECT", error.toJSON ? error.toJSON() : error);
  if (error.response) {
    console.log("STATUS:", error.response.status);
    console.log("DATA:", error.response.data);
  } else if (error.request) {
    console.log("NO RESPONSE RECEIVED:", error.request);
  } else {
    console.log("ERROR MESSAGE:", error.message);
  }
  return rejectWithValue(
    error.response?.data ||
    error.message ||
    "Registration failed"
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
    resetTrainerRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerTrainerThunk.pending, (state) => {
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
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { resetTrainerRegisterState } = trainerRegistrationSlice.actions;
export default trainerRegistrationSlice.reducer;
