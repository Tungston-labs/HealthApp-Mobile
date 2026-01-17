import api from "./api";

// Create Razorpay order
export const createTrainerBookingOrder = (payload) => {
  return api.post("create-trainer-booking-order/", payload);
};

// Verify Razorpay payment
export const verifyTrainerPayment = (payload) => {
  return api.post("verify-trainer-payment/", payload);
};




