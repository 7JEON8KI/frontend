import api from "./api";

export const promotionApi = {
  getBanner: () => api.get("/banner"),
};

export default promotionApi;
