import { publicApi } from "./api";
import {
  extractApiErrorMessage,
  hasEmailFieldError,
  isDuplicateEmailError,
} from "../utils/registrationErrors";

const normalizeRole = (role) => (role === "trainer" ? "trainer" : "client");

const buildEmailCheckRequest = (role, email) => {
  if (normalizeRole(role) === "trainer") {
    return null;
  }

  return publicApi.post("client/register/", { email });
};

export const checkRegistrationEmailAvailability = async (role, email) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return { exists: false };
  }

  try {
    const request = buildEmailCheckRequest(role, normalizedEmail);

    // The trainer API path is the real create endpoint, so posting only
    // the email here can create an incomplete trainer row with null fields.
    // Until the backend exposes a safe availability endpoint, we skip the
    // pre-check and let the actual registration request surface duplicates.
    if (!request) {
      return { exists: false };
    }

    await request;
    return { exists: false };
  } catch (error) {
    const payload = error?.response?.data;

    if (isDuplicateEmailError(payload) || hasEmailFieldError(payload)) {
      return {
        exists: true,
        message: extractApiErrorMessage(payload, "Email already exists"),
      };
    }

    if (error?.response?.status === 400) {
      return { exists: false };
    }

    throw new Error(
      extractApiErrorMessage(
        payload,
        error?.message || "Unable to verify email right now"
      )
    );
  }
};
