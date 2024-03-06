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

// 응답 전, 응답 에러 처리를 위한 인터셉트
api.interceptors.response.use(
  function (response) {
    //debugging console.log
    console.log(`api: ${response.config.baseURL}${response.config.url}\n${response.data?.message}`);
    console.log(response.data);
    if (
      response.config.url?.startsWith("/payment/imp_") ||
      (response.config.url === "/carts" && response.config.method === "post")
    )
      return response;

    return response.data;
  },

  function (error) {
    //response.config.url 이 reviews로 시작하는 경우, 404 에러를 무시
    if (error.response.status === 404) {
      if (error.config.url.startsWith("/reviews/member/") && error.config.method === "get") {
        return error.response.data;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
