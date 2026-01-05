import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import registrationReducer from './slices/registrationSlice';
import ForgotPasswordReducer from './slices/forgotPasswordSlice';
import VerifyOtpReducer from './slices/verifyOtpSlice';
import ResetPasswordReducer from './slices/resetPasswordSlice';
import PlanReducer from './slices/planSlice';
import trainerRegistrationReducer from './slices/trainerRegistrationSlice';
import trainerPlanReducer from './slices/trainerPlanSlice';
import trainerDetailReducer from './slices/trainerDetailSlice';
import { scheduleApi } from './api/trainer/scheduleApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    registration: registrationReducer,
    forgotpassword: ForgotPasswordReducer,
    verifyotp: VerifyOtpReducer,
    resetpassword: ResetPasswordReducer,
    planList: PlanReducer,
    trainerReg: trainerRegistrationReducer,
    trainer: trainerPlanReducer,
    trainerDetail: trainerDetailReducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(scheduleApi.middleware),
});
