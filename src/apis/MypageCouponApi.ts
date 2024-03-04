import api from "./api";

export const mypageCouponApi = {
  getCoupons: () => api.get("/coupons"),
};

export default mypageCouponApi;
