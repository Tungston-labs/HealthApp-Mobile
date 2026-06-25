
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerClientApi } from "../../services/clientServices";
import { setToken } from "../../storage/asyncStorage";
import {
  extractApiErrorMessage,
  extractApiFieldErrors,
} from "../../utils/registrationErrors";

export const registerClientThunk = createAsyncThunk(
  "client/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await registerClientApi(formData);
      const user = res.data?.data;
      const access = res.data?.access;
      const refresh = res.data?.refresh;

      if (access || refresh) {
        await setToken(access, refresh);
      }

      return { user, access, refresh };
    } catch (err) {
      const payload = err.response?.data;
      const message = extractApiErrorMessage(
        payload,
        err.message || "Registration failed"
      );
      return rejectWithValue({
        message,
        fieldErrors: extractApiFieldErrors(payload),
        status: err.response?.status,
      });
    }
  }
);


const clientSlice = createSlice({
    name: "client",
    initialState: {
        loading: false,
        registered: false,
        error: null,
    },
    reducers: {
        resetClientState: (state) => {
            state.loading = false;
            state.registered = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerClientThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerClientThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.registered = true;

                const access = action.payload?.access;
                const refresh = action.payload?.refresh;
                if (access || refresh) {
                    setToken(access, refresh);
                }
            })

            .addCase(registerClientThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.payload;
            });
    },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;
