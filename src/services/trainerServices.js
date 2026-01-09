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

export const cancelTrainingService = (trainerId) => {
  return api.post(`cancel-training/${trainerId}/`);
};
export const reportTrainerService = (payload) => {
  return api.post("trainer-report/", payload);
};
export const fetchTrainerDetailAPI = async (trainerId) => {
  const response = await api.get(`trainer/detail/${trainerId}/`);
  return response.data;
};
