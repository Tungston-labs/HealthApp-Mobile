import api from "./api";

export const loginApi = (payload) =>
  api.post("auth/login/", payload);

export const logoutApi = (refresh) =>
  api.post("auth/logout/", { refresh });

export const refreshTokenApi = (refresh) =>
  api.post("auth/token/refresh/", { refresh });

export const forgotPasswordStep = (payload) =>
  api.post("auth/forgot-password/step1/", payload);

export const verifyOtp = (payload) =>
  api.post("auth/forgot-password/verify-otp/", payload);

export const resetPassword = (payload) =>
  api.post("auth/forgot-password/reset/", payload);
