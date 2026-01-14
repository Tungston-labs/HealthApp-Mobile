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

export const fetchWeeklySessionsApi = async () => {
  const response = await api.get(
    "section/client/weeklysessions/"
  );
  console.log("Weekly sessions API raw response:", response.data);
  return response;
};
