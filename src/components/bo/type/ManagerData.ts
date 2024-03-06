export interface SalesOrder {
  orderProductId: string;
  productId: string;
  orderProductCount: number;
  orderProductPrice: number;
  orderProductDiscount: number;
  orderDate: string;
  address: string;
  zipCode: string;
  receiverName: string;
  phoneNumber: string;
  orderStatus: string;
  orderNumber: string;
  orderRequired: string;
  paymentMethod: string;
}

export interface Product {
  productId: string;
  productName: string;
  productSubName: string;
  price: string;
  productType: string;
  stock: string;
  discountRate: string;
  amount: number;
  calorie: number;
  storage: string;
  thumbnailImageUrl: string;
  productDetail: string;
  createdDate: string;
}

export function createSalesOrder(
  orderProductId: string,
  productId: string,
  orderProductCount: number,
  orderProductPrice: number,
  orderProductDiscount: number,
  orderDate: string,
  address: string,
  zipCode: string,
  receiverName: string,
  phoneNumber: string,
  orderStatus: string,
  orderNumber: string,
  orderRequired: string,
  paymentMethod: string,
): SalesOrder {
  return {
    orderProductId,
    productId,
    orderProductCount,
    orderProductPrice,
    orderProductDiscount,
    orderDate,
    address,
    zipCode,
    receiverName,
    phoneNumber,
    orderStatus,
    orderNumber,
    orderRequired,
    paymentMethod,
  };
}

export function createProduct(
  productId: string,
  productName: string,
  productSubName: string,
  price: string,
  productType: string,
  stock: string,
  discountRate: string,
  amount: number,
  calorie: number,
  storage: string,
  thumbnailImageUrl: string,
  productDetail: string,
  createdDate: string,
): Product {
  return {
    productId,
    productName,
    productSubName,
    price,
    productType,
    stock,
    discountRate,
    amount,
    calorie,
    storage,
    thumbnailImageUrl,
    productDetail,
    createdDate,
  };
}
