import api from "./api";

export const orderHistoryApi = {
  orderHistory: () => api.get("/order/history"),
  orderDetail: (orderId: number) => api.get(`/order/history/${orderId}`),
};

export default orderHistoryApi;
