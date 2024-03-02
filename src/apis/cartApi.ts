import api from "./api";

export const cartApi = {
  getCarts: () => api.get("/carts"),
  saveOrDeleteCart: ({ ...body }) => api.post("/carts/", body),
  getCartsCount: () => api.get("/carts/count"),
};

export default cartApi;
