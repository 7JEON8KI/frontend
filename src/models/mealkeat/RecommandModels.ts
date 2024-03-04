// 추천
export interface RecommandRequset {
  productId: number;
  productMainImage: string;
  productName: string;
}
export interface ProductRecommandResponse {
  productId: string;
  productName: string;
  price: string;
  productType: string;
  discountRate: number;
  mainImgUrl: string;
}
