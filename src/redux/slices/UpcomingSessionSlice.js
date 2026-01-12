import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeeklySessionsApi } from "../../services/SessionHistoryServices";

export const fetchWeeklySessionsThunk = createAsyncThunk(
    "weeklySessions/fetch",
    async (_, { rejectWithValue }) => {
        try {
            console.log(" WEEKLY THUNK HIT");
            const sessions = await fetchWeeklySessionsApi();
            console.log(" WEEKLY API RESPONSE:", sessions);
            return sessions.data; //  MUST RETURN the array
        } catch (error) {
            console.log(" WEEKLY THUNK ERROR:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const weeklySessionsSlice = createSlice({
    name: "weeklySessions",
    initialState: {
        sessions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeeklySessionsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeeklySessionsThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.sessions = action.payload.data;  
            })

            .addCase(fetchWeeklySessionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default weeklySessionsSlice.reducer;


