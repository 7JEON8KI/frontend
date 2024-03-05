import api from "./api";

export const paymentApi = {
  completePayment: ({ ...body }) => api.post("/payment", body),
  validatePayment: (imp_uid: string) => api.post(`/payment/${imp_uid}`),
  getUserInfo: () => api.get("/auth/member"),
};

export default paymentApi;
