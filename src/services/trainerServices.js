import { Platform } from "react-native";
import api, { publicApi } from "./api";

export const uploadImageApi = async (file) => {
  const formData = new FormData();

  const uri =
    Platform.OS === "android"
      ? file.uri.startsWith("file://") ? file.uri : `file://${file.uri}`
      : file.uri;

  formData.append("file", {
    uri,
    name: file.fileName || `upload_${Date.now()}.jpg`,
    type: file.type || "image/jpeg",
  });

  console.log("📤 Uploading:", uri);

  return publicApi.post(
    "trainer/upload-image/",
    formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
      withCredentials: false,
    }
  ).then(res => res.data.url);
};


export const registerTrainerApi = async (formData) => {
  return publicApi.post(
    "trainer/",
    formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
      timeout: 30000,
    }
  );
};



export const fetchAvailableTrainersAPI = async (payload) => {
  // Normalize payload to avoid platform-specific formatting issues
  const normalized = { ...payload };

  if (normalized.slot_days) {
    if (typeof normalized.slot_days === 'string') {
      normalized.slot_days = normalized.slot_days
        .split(',')
        .map(s => s.trim().toLowerCase());
    } else if (Array.isArray(normalized.slot_days)) {
      normalized.slot_days = normalized.slot_days.map(s => String(s).trim().toLowerCase());
    }
  }

  console.log('➡️ POST trainer/available-trainers/ payload:', JSON.stringify(normalized));

  try {
    const response = await api.post('trainer/available-trainers/', normalized);
    return response;
  } catch (err) {
    console.log('❌ trainer/available-trainers/ error status:', err?.response?.status);
    console.log('❌ trainer/available-trainers/ error data:', err?.response?.data);
    throw err;
  }
};

export const getTrainerDetailService = (trainerId) => {
  return api.get(`detail/${trainerId}/`);
};


export const reportTrainerService = (payload) => {
  return api.post("trainer-report/", payload);
};
export const fetchTrainerDetailAPI = async (trainerId) => {
  const response = await api.get(`trainer/detail/${trainerId}/`);
  console.log({ response })
  return response.data;
};



const getTrainerBookings = async ({ page = 1, date = null }) => {
  let url = `section/trainer/bookings/?page=${page}`;

  if (date) {
    url += `&date=${date}`; // YYYY-MM-DD
  }

  const response = await api.get(url);
  return response.data;
};

const trainerService = {
  getTrainerBookings,
};

export default trainerService;


// trainer session history

export const fetchTrainerHistory = async (page = 1) => {
  const response = await api.get(`section/trainer/history/?page=${page}`);
  console.log(
    "✅ API RESPONSE (trainer history):",
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
};



export const fetchTrainerProfileApi = async () => {
  const response = await api.get("trainer/profile/");
  return response.data;
};

export const updateTrainerProfileApi = async (formData) => {
  const response = await api.patch(
    "trainer/profile/edit/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
// change trainer
export const fetchChangeTrainer = async (trainerId) => {
  if (!trainerId) {
    throw new Error("trainerId is required");
  }

  const response = await api.get("trainer/change/", {
    params: { trainer_id: trainerId },
  });

  console.log(
    "✅ API RESPONSE (Change Trainer):",
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
};

// change trainer payments
export const createChangeTrainerOrder = (payload) =>
  api.post("trainer/payment/change-trainer/order/", payload);

export const verifyChangeTrainerPayment = (payload) =>
  api.post("trainer/payment/change-trainer/verify/", payload);

export const getPlansApi = async () => {
  const response = await fetch(
    "http://178.248.112.16:9001/api/plan/public/"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return await response.json();
};