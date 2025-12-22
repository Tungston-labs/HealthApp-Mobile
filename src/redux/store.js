import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import registrationReducer from './slices/registrationSlice';
import ForgotPasswordReducer from './slices/forgotPasswordSlice';
import VerifyOtpReducer from './slices/verifyOtpSlice';
import ResetPasswordReducer from "./slices/resetPasswordSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    registration: registrationReducer,
    forgotpassword: ForgotPasswordReducer,
    verifyotp: VerifyOtpReducer,
    resetpassword:ResetPasswordReducer,
  },
});
