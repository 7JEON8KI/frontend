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
      window.location.href = "/bo/error";
    }
    return Promise.reject(error);
  },
);

export const boAdminApi = {
  getBoMemberList: () => api.get("/admin/member"),
  modifyMember: ({ ...body }) => api.post("/admin/member/modify", body),
  downloadMemberList: () => api.get("/admin/member/excelDown"),
  deleteMember: ({ ...body }) => api.delete("/admin/member/delete", body),
  commitAuth: ({ ...body }) => api.post("/admin/member/auth", body),
  getBoManagerList: () => api.get("/admin/member/manager"),
  uploadImage: ({ ...formData }) => api.post("/upload", formData),
  getBoProductList: () => api.get("/admin/products"),
  insertEvent: ({ ...body }) => api.post("/admin/event", body),
  getBannerList: () => api.get("/admin/banner"),
  getEventList: () => api.get("/admin/event"),
  insertBanner: ({ ...body }) => api.post("/admin/banner", body),
  getThemeAndIngredient: (productNum: string) => api.post(`/admin/products/${productNum}`),
  deleteBanner: (bannerId: string) => api.delete(`/admin/banner/${bannerId}`),
  deleteProduct: (productNum: number) => api.delete(`/admin/products/delete/${productNum}`),
  getSalesList: () => api.get("/admin/products/orders/total"),
};

export default boAdminApi;
