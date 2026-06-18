const DUPLICATE_EMAIL_REGEX = /(email).*(already|exist|taken|registered)|(already|exist|taken|registered).*(email)/i;
const GENERIC_API_MESSAGES = [
  /^validation failed$/i,
  /^login failed$/i,
  /^registration failed$/i,
  /^request failed$/i,
];

const isPlainObject = (value) =>
  !!value && typeof value === "object" && !Array.isArray(value);

const collectMessages = (value) => {
  if (!value) return [];

  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectMessages);
  }

  if (isPlainObject(value)) {
    return Object.values(value).flatMap(collectMessages);
  }

  return [];
};

const getEmailMessages = (payload) => {
  if (!isPlainObject(payload)) return [];

  const directEmail = collectMessages(payload.email);
  const nestedEmail = isPlainObject(payload.errors)
    ? collectMessages(payload.errors.email)
    : [];

  return [...directEmail, ...nestedEmail];
};

export const hasEmailFieldError = (payload) => getEmailMessages(payload).length > 0;

export const isDuplicateEmailError = (payload) => {
  const emailMessages = getEmailMessages(payload);

  if (emailMessages.some((message) => DUPLICATE_EMAIL_REGEX.test(message))) {
    return true;
  }

  return collectMessages(payload).some(
    (message) =>
      /email/i.test(message) && DUPLICATE_EMAIL_REGEX.test(message)
  );
};

export const extractApiErrorMessage = (
  payload,
  fallback = "Something went wrong"
) => {
  const emailMessages = getEmailMessages(payload);
  const duplicateEmailMessage = emailMessages.find((message) =>
    DUPLICATE_EMAIL_REGEX.test(message)
  );

  if (duplicateEmailMessage) {
    return duplicateEmailMessage;
  }

  if (emailMessages.length > 0) {
    return emailMessages[0];
  }

  const allMessages = collectMessages(payload);
  const firstUsefulMessage = allMessages.find(
    (message) =>
      !GENERIC_API_MESSAGES.some((pattern) => pattern.test(message))
  );

  if (firstUsefulMessage) {
    return firstUsefulMessage;
  }

  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message.trim();
  }

  if (typeof payload?.detail === "string" && payload.detail.trim()) {
    return payload.detail.trim();
  }

  return fallback;
};
