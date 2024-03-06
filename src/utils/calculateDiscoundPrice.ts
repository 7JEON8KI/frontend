interface Props {
  price: number;
  discountRate: number;
}

function calculateDiscountPrice({ price, discountRate }: Props) {
  if (discountRate <= 0) return price;
  return Math.floor(price * (1 - discountRate / 100));
}

export default calculateDiscountPrice;
