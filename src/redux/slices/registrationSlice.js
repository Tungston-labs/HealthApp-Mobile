import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    role: null,
    age: null,
    dob: null,
    gender: null,
    blood_group: null,
    height: null,
    weight: null,
    wellness_goal: null,
    address: "",
    health_issues: "",
    name: "",
    email: "",
    phno: "",
    password: "",
  },
  reducers: {
    updateRegistration: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetRegistration: () => ({
      role: null,
      age: null,
      dob: null,
      gender: null,
      blood_group: null,
      height: null,
      weight: null,
      wellness_goal: null,
      address: "",
      health_issues: "",
      name: "",
      email: "",
      phno: "",
      password: "",
    }),
  },
});

export const { updateRegistration, resetRegistration } =
  registrationSlice.actions;
export default registrationSlice.reducer;
