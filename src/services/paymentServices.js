// services/paymentServices.js
import api from "./api";

// Create Razorpay order
export const createTrainerBookingOrder = async (payload) => {
  try {
    return await api.post("trainer/create-trainer-booking-order/", payload);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error?.response?.data || error.message);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyTrainerPayment = async (payload) => {
  try {
    return await api.post("trainer/verify-trainer-payment/", payload);
  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error?.response?.data || error.message);
    throw error;
  }
};




