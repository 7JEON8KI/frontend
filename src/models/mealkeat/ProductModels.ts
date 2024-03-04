import { Sort, ThemeName } from "constants/productConstants";

// 상품

export interface ProductResponseDTO {
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
export interface ProductResponse {
  total: number;
  productResponseDTOList: ProductResponseDTO[];
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

export interface ProductSearchRequest extends Partial<ProductSortRequest> {
  searchRequestDTO: {
    keyword: string;
  };
}

export interface ProductMealkeatRequest extends Partial<ProductSortRequest> {
  searchRequestDTO: {
    preferredIngredients: string[];
    unwantedIngredients: string[];
  };
}
