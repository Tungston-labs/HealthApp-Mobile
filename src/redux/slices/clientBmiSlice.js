import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientBMI } from "../../services/clientServices";

export const getClientBMIThunk = createAsyncThunk(
    "clientBmi/get",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchClientBMI();
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch BMI"
            );
        }
    }
);

const clientBmiSlice = createSlice({
    name: "clientBmi",
    initialState: {
        loading: false,
        name: "",
        bmi: "",
        category: "",
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getClientBMIThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClientBMIThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.name = action.payload.name;
                state.bmi = Number(action.payload.bmi).toFixed(1); // 👈 format
                state.category = action.payload.category;
            })

            .addCase(getClientBMIThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default clientBmiSlice.reducer;
