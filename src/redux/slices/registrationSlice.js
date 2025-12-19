import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  dob: null,
  gender: null,
  blood_group: null,
  height: null,
  weight: null,

  wellness_goal: [],
  health_issues: [],

  address: "",
  name: "",
  email: "",
  phno: "",
  password: "",
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    updateRegistration: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetRegistration: () => ({
      ...initialState,
      wellness_goal: [],
      health_issues: [],
    }),
  },
});

export const { updateRegistration, resetRegistration } =
  registrationSlice.actions;

export default registrationSlice.reducer;
