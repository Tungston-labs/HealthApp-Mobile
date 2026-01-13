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

// GET CLIENT PROFILE (MOBILE) 
export const fetchMobProfileApi = async () => {
  const response = await api.get("client/mob/profile/");
  return response.data;
};


// edit client profie in mobile app


export const updateProfileApi = (payload) => {
  console.log("SENDING PATCH PAYLOAD:", payload);

  return api.patch(
    "client/profile/edit/",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
