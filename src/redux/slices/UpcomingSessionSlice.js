import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeeklySessionsApi } from "../../services/SessionHistoryServices";

export const fetchWeeklySessionsThunk = createAsyncThunk(
    "weeklySessions/fetch",
    async (_, { rejectWithValue }) => {
        try {
            console.log(" WEEKLY THUNK HIT");
            const sessions = await fetchWeeklySessionsApi();
            console.log(" WEEKLY API RESPONSE:", sessions);
            return sessions.data;
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
    reducers: {
        clearWeeklySessions: (state) => {
            state.sessions = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeeklySessionsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeeklySessionsThunk.fulfilled, (state, action) => {
                state.loading = false;
                const payloadData = action.payload;
                let list = [];
                if (Array.isArray(payloadData)) {
                    list = payloadData;
                } else if (Array.isArray(payloadData?.data)) {
                    list = payloadData.data;
                }
                state.sessions = list;
            })
            .addCase(fetchWeeklySessionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.sessions = [];
                state.error = action.payload;
            });
    },
});

export const { clearWeeklySessions } = weeklySessionsSlice.actions;
export default weeklySessionsSlice.reducer;
