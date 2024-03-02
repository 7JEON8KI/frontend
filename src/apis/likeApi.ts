import api from "./api";

export const likeApi = {
  getLikes: () => api.get("/likes"),
  saveLikes: (productId: number) => api.post(`/likes/${productId}`),
  deleteLikes: (productId: number) => api.post(`/likes/${productId}`),
};

export default likeApi;
