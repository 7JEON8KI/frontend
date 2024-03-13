import api from "./api";
import {
  ProductSortRequest,
  ProductWineRequest,
  ProductThemeRequest,
  ProductSearchRequest,
  ProductMealkeatRequest,
} from "models/mealkeat/ProductModels";

interface ProductDetailParams {
  productId: number;
}

export const productApi = {
  getProducts: ({ ...body }: ProductSortRequest) => api.post("/products", body),
  getProductsWithSearch: ({ ...body }: ProductSearchRequest) => api.post("/products", body),
  getProductsWithImageSearch: (formData: FormData) =>
    api.post("/products/image-search", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  getProductsMealkeatRecommend: ({ ...body }: ProductMealkeatRequest) => api.post("/products", body),
  getProductDetail: ({ productId }: ProductDetailParams) => api.get(`/products/${productId}`),
  getThemeProducts: ({ ...body }: ProductThemeRequest) => api.post("/products/theme", body),
  getWineProducts: ({ ...body }: ProductWineRequest) => api.post("/products/wine", body),
  getProductIngredients: ({ productId }: ProductDetailParams) => api.get(`/products/ingredients/${productId}`),
};

export default productApi;
