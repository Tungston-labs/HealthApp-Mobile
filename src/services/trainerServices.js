import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import axios from "axios";


export const registerTrainerApi = (payload) => {
  return api.post("trainer/", payload, {
    skipAuth: true, 
  });
};


const BASE_URL = "http://178.248.112.16:9001/api/trainer/";

export const fetchAvailableTrainersAPI = async (payload) => {
  const token = await AsyncStorage.getItem("access_token");

  const response = await axios.post(
    `${BASE_URL}available-trainers/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getTrainerProfile = () =>
  api.get("trainer/profile/");

export const editTrainerProfile = (data) =>
  api.patch("trainer/profile/edit/", data);

export const listTrainers = () =>
  api.get("trainer/list/");

export const availableTrainers = (payload) =>
  api.post("trainer/available-trainers/", payload);

export const trainerDetail = (id) =>
  api.get(`trainer/detail/${id}/`);

export const bookTrainer = (payload) =>
  api.post("trainer/book-trainer/", payload);
