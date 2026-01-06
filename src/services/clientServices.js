import api from "./api";


export const registerClientApi = (data) =>
  api.post("client/register/", data);




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
