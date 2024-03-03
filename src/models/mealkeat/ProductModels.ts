export interface ProductResponse {
  amount: number;
  calorie: number;
  createdAt: number[];
  discountRate: number;
  isLike: number;
  modifiedAt: number[];
  price: number;
  productDetail: string;
  productId: number;
  productName: string;
  productSubName: string;
  productType: string;
  rn: number;
  stock: number;
  storage: string;
  themeName?: string;
  thumbnailImageUrl: string;
}

export interface ProductSortRequest {
  productCriteria: {
    pageNum: number;
    pageAmount: number;
    sort: string;
    includeSoldOut: number;
  };
}
