import { Sort, ThemeName } from "constants/productConstants";

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

export interface ProductRecommandResponse {
  productId: string | number;
  productName: string;
  price: string | number;
  productType: string;
  discountRate: number;
  mainImgUrl: string;
}

export interface DefaultProductRequest {
  pageNum: number;
  pageAmount: number;
  sort: Sort;
  includeSoldOut: number;
}

export interface ProductWineRequest extends DefaultProductRequest {}

export interface ProductThemeRequest extends DefaultProductRequest {
  themeName: ThemeName;
}
export interface ProductSortRequest {
  productCriteria: DefaultProductRequest;
}
