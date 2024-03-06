import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    Authorization: localStorage.getItem("Authorization"),
  },
});
api.interceptors.response.use(
  function (response) {
    //debugging console.log
    console.log(`api: ${response.config.baseURL}${response.config.url}\n${response.data?.message}`);
    console.log(response.data);

    return response.data;
  },

  function (error) {
    if (error.response.status === 403) {
      window.location.href = "../";
    }
    return Promise.reject(error);
  },
);

export const boManagerApi = {
  getOrderList: () => api.get("/manager/products/order"),
  getProductDetail: (productId: string) => api.get(`/manager/products/${productId}`),
  modifyProduct: ({ ...body }) => api.post("/manager/products/modify", body),
  getProductList: () => api.get("/manager/products"),
  insertProduct: ({ ...body }) => api.post("/manager/products", body),
  deleteProduct: ({ ...body }) => api.delete("/manager/products", body),
  addIngredientAndTheme: ({ ...body }) => api.post("/manager/products/addIngAndTheme", body),
  deleteIngredientAndTheme: ({ ...body }) => api.delete("/manager/products/deleteIngAndTheme", body),
};

export default boManagerApi;
