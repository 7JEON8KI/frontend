import api from "./api";

export const likeApi = {
  getLikes: () => api.get("/likes"),
};

export default likeApi;
