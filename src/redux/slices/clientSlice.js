
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerClientApi } from "../../services/clientServices";
import { setToken } from "../../storage/asyncStorage";
import { setAuth } from "../slices/authSlice"; // ✅ import setAuth

export const registerClientThunk = createAsyncThunk(
  "client/register",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await registerClientApi(payload);
      const responseData = res.data;
      const tokenObject = responseData?.token;
      const access = tokenObject?.access || responseData?.access;
      const refresh = tokenObject?.refresh || responseData?.refresh;
      const user = responseData?.user || responseData?.data;

      if (access || refresh) {
        await setToken(access, refresh);
      }

      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }

      if (access) {
        dispatch(setAuth({ user, access }));
      }

      return responseData;
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

                const access = action.payload?.token?.access ?? action.payload?.access;
                const refresh = action.payload?.token?.refresh ?? action.payload?.refresh;
                if (access || refresh) {
                    setToken(access, refresh);
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