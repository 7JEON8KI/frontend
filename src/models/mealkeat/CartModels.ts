export interface CartData {
  cartId: number;
  memberId: string;
  modifiedAt: string; // 또는 Date 타입으로 변환하여 사용할 수 있습니다.
  cartProducts: CartProductDTO[];
}

export interface CartProductDTO {
  cartProductId: number;
  productId: number;
  cartProductCnt: number;
  productName: string;
  productSubName: string;
  price: number;
  productType?: string;
  stock: number;
  discountRate: number;
  productDetail: string;
  amount: number;
  calorie: number;
  storage: string;
  thumbnailImageUrl: string;
}

export interface CartProduct extends CartProductDTO {
  selected: boolean;
}
