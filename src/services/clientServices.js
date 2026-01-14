import api from "./api";


export const registerClientApi = (data) =>
  api.post("client/register/", data);




export const getClientProfile = () =>
  api.get("client/profile/");

export const fetchClientTrainersAPI = async (payload = {}) => {
  try {
    const response = await api.get("client/booked-trainers/", {
      params: payload, // GET params
    });
    console.log("API CALL SUCCESS", response.data);
    return response.data; // Return the actual data
  } catch (err) {
    console.log("API CALL ERROR", err.response || err);
    throw err;
  }
};
export const ClientCancelTraining = async () => {
  const response = await api.post("refund/training/cancel/");
  return response.data;
};
export const updateClientProfile = (id, data) =>
  api.patch(`client/${id}/`, data);

export const listClients = (planId) =>
  api.get(`client/?plan_id=${planId}`);

export const dashboardCounts = () =>
  api.get("client/dashboard/counts/");

export const planList = () => {
  return api.get("plan/clientlist/");
};
