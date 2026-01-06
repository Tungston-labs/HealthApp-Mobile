import api from "./api";

export const uploadImageApi = async (file) => {
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri.startsWith("file://") ? file.uri : `file://${file.uri}`,
    name: file.fileName || "image.jpg",
    type: file.type || "image/jpeg",
  });

  const res = await api.post("trainer/upload-image/", formData, {
    skipAuth: true,
  });

  return res.data.url;
};


export const registerTrainerApi = (formData) => {
  return api.post("trainer/", formData, {
    skipAuth: true,
    headers: {
      Accept: "application/json",
      
    },
  });
};

export const fetchAvailableTrainersAPI = async (payload) => {
  const response = await api.post("trainer/available-trainers/", payload);
  return response.data;
};

export const fetchTrainerDetailAPI = async (trainerId) => {
  const response = await api.get(`trainer/detail/${trainerId}/`);
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
