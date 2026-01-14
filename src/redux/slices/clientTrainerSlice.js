import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientTrainersAPI } from "../../services/clientServices";

/* -------------------- THUNK -------------------- */
export const fetchClientTrainersThunk = createAsyncThunk(
  "clientTrainer/fetch",
  async (payload = {}, { rejectWithValue }) => {
    try {
      const data = await fetchClientTrainersAPI(payload);
      console.log("THUNK DATA 👉", data);
      return data; 
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch client trainers");
    }
  }
);




/* -------------------- INITIAL STATE -------------------- */
const initialState = {
  trainers: [],
  plan: null,
  total: 0,
  loading: false,
  error: null,
};

/* -------------------- SLICE -------------------- */
const clientTrainerSlice = createSlice({
  name: "clientTrainer",
  initialState,
  reducers: {
    clearClientTrainers: (state) => {
      state.trainers = [];
      state.plan = null;
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientTrainersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(fetchClientTrainersThunk.fulfilled, (state, action) => {
  state.loading = false;

  // map API fields to what TrainerCard expects
  state.trainers = (action.payload?.data ?? []).map(t => ({
    id: t.id,
    name: t.trainer_name,
    profile_pic: t.trainer_profile_pic,
    experience: null, // optional
    single_price: null,
    star_rating: null,
    date: t.date,
    time: t.time,
    trainer_id:t.trainer_id,
    status: t.status,
  }));

  state.total = action.payload?.count ?? 0;
})


      .addCase(fetchClientTrainersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearClientTrainers } = clientTrainerSlice.actions;
export default clientTrainerSlice.reducer;
