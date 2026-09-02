const DUPLICATE_EMAIL_REGEX = /(email).*(already|exist|taken|registered|unique|integrityerror)|(already|exist|taken|registered|unique|integrityerror).*(email)/i;
const DUPLICATE_PHONE_REGEX = /(phno|phone|mobile|number).*(already|exist|taken|registered|unique|integrityerror)|(already|exist|taken|registered|unique|integrityerror).*(phno|phone|mobile|number)/i;
const GENERIC_API_MESSAGES = [
  /^validation failed$/i,
  /^login failed$/i,
  /^registration failed$/i,
  /^request failed$/i,
  /integrityerror/i,
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

const getFieldMessages = (payload, fieldNames) => {
  if (!isPlainObject(payload)) return [];

  const messages = [];
  const containers = [payload, isPlainObject(payload.errors) ? payload.errors : null].filter(Boolean);

  containers.forEach((container) => {
    fieldNames.forEach((field) => {
      messages.push(...collectMessages(container[field]));
    });
  });

  return messages;
};

const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  phno: "Phone number",
  phone: "Phone number",
  mobile: "Phone number",
  password: "Password",
  profile_pic: "Profile picture",
  dob: "Date of birth",
  age: "Age",
  gender: "Gender",
  blood_group: "Blood group",
  wellness_goal: "Wellness goal",
  health_issues: "Health conditions",
  height: "Height",
  weight: "Weight",
  address: "Address",
  latitude: "Location",
  longitude: "Location",
};

const NON_FIELD_KEYS = new Set([
  "message",
  "detail",
  "status",
  "success",
  "data",
  "non_field_errors",
]);

export const hasEmailFieldError = (payload) => getEmailMessages(payload).length > 0;

export const hasPhoneFieldError = (payload) =>
  getFieldMessages(payload, ["phno", "phone", "mobile"]).length > 0;

export const isDuplicateEmailError = (payload) => {
  const emailMessages = getEmailMessages(payload);
  if (emailMessages.some((message) => DUPLICATE_EMAIL_REGEX.test(message))) {
    return true;
  }
  const rawString = typeof payload === "string" ? payload : JSON.stringify(payload || {});
  return /email/i.test(rawString) && DUPLICATE_EMAIL_REGEX.test(rawString);
};

export const isDuplicatePhoneError = (payload) => {
  const phoneMessages = getFieldMessages(payload, ["phno", "phone", "mobile"]);
  if (phoneMessages.some((message) => DUPLICATE_PHONE_REGEX.test(message))) {
    return true;
  }
  const rawString = typeof payload === "string" ? payload : JSON.stringify(payload || {});
  return /(phno|phone|mobile|number)/i.test(rawString) && DUPLICATE_PHONE_REGEX.test(rawString);
};

export const extractApiFieldErrors = (payload) => {
  if (!isPlainObject(payload)) return [];

  const source = isPlainObject(payload.errors) ? payload.errors : payload;

  return Object.entries(source)
    .filter(([field]) => !NON_FIELD_KEYS.has(field))
    .filter(([, value]) => collectMessages(value).length > 0)
    .map(([field, value]) => {
      const message = collectMessages(value)[0];
      const label = FIELD_LABELS[field] || field.replace(/_/g, " ");

      let cleanMessage = message;
      if (DUPLICATE_PHONE_REGEX.test(message) || /(phno|phone|mobile)/i.test(field)) {
        cleanMessage = "This phone number is already registered. Please enter a different phone number or log in.";
      } else if (DUPLICATE_EMAIL_REGEX.test(message) || field === "email") {
        cleanMessage = "This email address is already registered. Please enter a different email address or log in.";
      } else if (GENERIC_API_MESSAGES.some((pattern) => pattern.test(message))) {
        cleanMessage = `${label} is invalid`;
      }

      return {
        field,
        message: cleanMessage,
      };
    });
};

export const extractApiErrorMessage = (
  payload,
  fallback = "Something went wrong"
) => {
  const rawString = typeof payload === "string" ? payload : JSON.stringify(payload || {});

  if (/(phno|phone|mobile)/i.test(rawString) && /(already|exist|taken|registered|unique|integrityerror)/i.test(rawString)) {
    return "This phone number is already registered. Please enter a different phone number or log in.";
  }

  if (/(email)/i.test(rawString) && /(already|exist|taken|registered|unique|integrityerror)/i.test(rawString)) {
    return "This email address is already registered. Please enter a different email address or log in.";
  }

  if (/integrityerror/i.test(rawString)) {
    if (/(phno|phone|mobile|number)/i.test(rawString)) {
      return "This phone number is already registered. Please enter a different phone number or log in.";
    }
    if (/email/i.test(rawString)) {
      return "This email address is already registered. Please enter a different email address or log in.";
    }
    return "An account with this phone number or email already exists. Please check your details or log in.";
  }

  const emailMessages = getEmailMessages(payload);
  const duplicateEmailMessage = emailMessages.find((message) =>
    DUPLICATE_EMAIL_REGEX.test(message)
  );

  if (duplicateEmailMessage) {
    return "This email address is already registered. Please enter a different email address or log in.";
  }

  const phoneMessages = getFieldMessages(payload, ["phno", "phone", "mobile"]);
  const duplicatePhoneMessage = phoneMessages.find((message) =>
    DUPLICATE_PHONE_REGEX.test(message)
  );

  if (duplicatePhoneMessage) {
    return "This phone number is already registered. Please enter a different phone number or log in.";
  }

  if (emailMessages.length > 0) {
    return emailMessages[0];
  }

  if (phoneMessages.length > 0) {
    return phoneMessages[0];
  }

  const fieldErrors = extractApiFieldErrors(payload);
  if (fieldErrors.length > 0) {
    return fieldErrors[0].message;
  }

  const allMessages = collectMessages(payload);
  const firstUsefulMessage = allMessages.find(
    (message) =>
      !GENERIC_API_MESSAGES.some((pattern) => pattern.test(message))
  );

  if (firstUsefulMessage) {
    return firstUsefulMessage;
  }

  if (typeof payload?.message === "string" && payload.message.trim() && !/integrityerror/i.test(payload.message)) {
    return payload.message.trim();
  }

  if (typeof payload?.detail === "string" && payload.detail.trim() && !/integrityerror/i.test(payload.detail)) {
    return payload.detail.trim();
  }

  return fallback;
};