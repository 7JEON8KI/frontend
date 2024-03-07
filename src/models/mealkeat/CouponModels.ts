export interface Coupon {
  couponId: number;
  memberId: string;
  couponName: string;
  discountRate: number;
  discountPrice: number;
  createdAt: Date;
  expiredAt: Date;
}
