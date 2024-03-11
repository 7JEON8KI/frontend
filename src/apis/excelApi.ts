import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("Authorization"),
  },
  responseType: "blob",
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

export const excelApi = {
  getOrderExcel: () => api.get("/manager/orders/exceldown"),
};

export default excelApi;
