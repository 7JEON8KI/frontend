import api from "./api";

export const memberApi = {
  saveMember: ({ ...body }) => api.post("/auth/save", body),
};

export default memberApi;
