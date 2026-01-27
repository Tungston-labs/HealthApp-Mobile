import { Platform } from "react-native";
import api from "./api";
import axios from "axios";

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

  return axios.post(
    "http://178.248.112.16:9001/api/trainer/upload-image/",
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
  return axios.post(
    "http://178.248.112.16:9001/api/trainer/",
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
  const response = await api.post("trainer/available-trainers/", payload);
  return response;
};

export const getTrainerDetailService = (trainerId) => {
  return api.get(`detail/${trainerId}/`);
};


export const reportTrainerService = (payload) => {
  return api.post("trainer-report/", payload);
};
export const fetchTrainerDetailAPI = async (trainerId) => {
  const response = await api.get(`trainer/detail/${trainerId}/`);
  console.log({response})
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