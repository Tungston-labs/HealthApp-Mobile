import api from "./api"


export const fetchCompletedSessionsApi = async (page = 1) => {
  const response = await api.get(
    `section/client/completed-sessions/?page=${page}`
  );

  return response.data;
};
export const fetchCompletedSessionDetailApi = (sectionId) => {
  return api.get(`section/client/completed-session/${sectionId}/`);
};