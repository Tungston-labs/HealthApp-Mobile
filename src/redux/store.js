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
import trainerUpcomingSessionsReducer from "./slices/trainerUpcomingSessions";
import trainerHistoryReducer from "./slices/trainerHistorySlice";
import trainerProfileReducer from "./slices/trainerProfileSlice";
import mobProfileReducer from "./slices/mobProfileSlice";
import clientProfileEditReducer from "./slices/clientProfileEditSlice";
import CancelTrainingReducer from"./slices/CancelTrainingSlice";



import { scheduleApi } from './api/trainer/scheduleApi';
import completedSessionreducer from "./slices/SessionHistorySlice"
import completedSessionDetailReducer from "./slices/completedSessionDetailSlice"
import weeklySessionsReducer from "./slices/UpcomingSessionSlice"
import trainerReducer from "./slices/trainerSlice"
import ClientTrainerReducer from "./slices/clientTrainerSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    registration: registrationReducer,
    forgotpassword: ForgotPasswordReducer,
    verifyotp: VerifyOtpReducer,
    resetpassword: ResetPasswordReducer,
    cancelTraining:CancelTrainingReducer,
    planList: PlanReducer,
    trainerReg: trainerRegistrationReducer,
    trainer: trainerPlanReducer,
    trainerDetail: trainerDetailReducer,

    trainerUpcomingSessions: trainerUpcomingSessionsReducer,
    trainerHistory: trainerHistoryReducer,
    trainerProfile: trainerProfileReducer,

    mobProfile: mobProfileReducer,
    
    profileEdit: clientProfileEditReducer,


    completedSessions:completedSessionreducer,
    weeklySessions:weeklySessionsReducer,
    trainerSessions:trainerReducer,
    completedSessionDetail:completedSessionDetailReducer,
    clientTrainer:ClientTrainerReducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(scheduleApi.middleware),
});
