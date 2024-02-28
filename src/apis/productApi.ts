import api from "./api";

interface ProductDetailParams {
  productId: number;
}

export const productApi = {
  getProducts: ({ ...body }) => api.post("/products", body),
  getProductDetail: ({ productId }: ProductDetailParams) => api.get(`/products/${productId}`),
};

export default productApi;
