import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const registerClientApi = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (!value) return;

    if (key === "profile_pic") {
      formData.append("profile_pic", {
        uri: value.uri,
        type: value.type || "image/jpeg",
        name: value.name || "profile.jpg",
      });
    } 
    else if (Array.isArray(value)) {
      value.forEach(item => formData.append(key, item));
    } 
    else {
      formData.append(key, value);
    }
  });

  return api.post("client/register/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getClientProfile = () =>
  api.get("client/profile/");

export const updateClientProfile = (id, data) =>
  api.patch(`client/${id}/`, data);

export const listClients = (planId) =>
  api.get(`client/?plan_id=${planId}`);

export const dashboardCounts = () =>
  api.get("client/dashboard/counts/");

export const planList = () => {
  return api.get("plan/clientlist/");
};
