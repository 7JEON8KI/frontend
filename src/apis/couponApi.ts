import api from "./api";

export const couponApi = {
  getCoupons: () => api.get("/coupons"),
};

export default couponApi;
