// 추천
export interface RecommendRequset {
  productId: number;
  productMainImage: string;
  productName: string;
}
export interface ProductRecommendResponse {
  productId: string;
  productName: string;
  price: number;
  productType: string;
  discountRate: number;
  mainImgUrl: string;
}
