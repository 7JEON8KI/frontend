import api from "./api";

interface CartPostRequest {
  productId: number;
  cartProductCnt?: number;
}
export const cartApi = {
  getCarts: () => api.get("/carts"),
  saveCart: ({ ...body }: CartPostRequest) => api.post("/carts", body),
  deleteCart: ({ ...body }: CartPostRequest) => api.post("/carts", body),
  getCartsCount: () => api.get("/carts/count"),
};

export default cartApi;
