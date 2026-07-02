import api from "./api"; 

export const createTicket = async ({ trainer_id, complaint }) => {
  const response = await api.post("/tickets/create/", {
    trainer_id,
    complaint,
  });

  return response.data;
};