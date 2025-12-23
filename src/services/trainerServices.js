import api from "./api";


export const registerTrainerApi = (payload) => {
  return api.post("trainer/", payload, {
    skipAuth: true, 
  });
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
