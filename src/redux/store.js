import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clientReducer from "./slices/clientSlice";
import registrationReducer from "./slices/registrationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    registration: registrationReducer,
  },
});
