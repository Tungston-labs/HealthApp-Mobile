import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  dob: null,
  gender: null,
  blood_group: null,
  height: null,
  weight: null,
 latitude: null,
  longitude: null,
  wellness_goal: [],
  health_issues: [],
  profile_pic: null,
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
      profile_pic: null,
    }),
  },
});

export const { updateRegistration, resetRegistration } =
  registrationSlice.actions;

export default registrationSlice.reducer;