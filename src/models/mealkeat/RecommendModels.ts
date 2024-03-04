// 추천
export interface RecommendRequset {
  productId: number;
  productMainImage: string;
  productName: string;
}
export interface ProductRecommendResponse {
  productId: string;
  productName: string;
  price: string;
  productType: string;
  discountRate: number;
  mainImgUrl: string;
}
