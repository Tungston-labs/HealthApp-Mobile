
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerClientApi } from "../../services/clientServices";
import { setToken } from "../../storage/asyncStorage";
import { setAuth } from "../slices/authSlice"; // ✅ import setAuth

export const registerClientThunk = createAsyncThunk(
  "client/register",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await registerClientApi(payload);
      const { token, user } = res.data;

      if (token) {
        await setToken(token.access, token.refresh);
      }

      dispatch(setAuth({ user, access: token?.access }));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
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
            })
            .addCase(registerClientThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.registered = true;

                const token = action.payload?.token;
                if (token) {
                    setToken(token.access, token.refresh);
                }
            })

            .addCase(registerClientThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;