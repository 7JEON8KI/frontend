import React from "react";
import { StyledContentPrice, StyledContentText, StyledProduct } from "./Product.style";
interface Product {
  imageUrl: string;
  title: string;
  description: string;
  discount: string;
  price: string;
  originalPrice: string;
  soldOut: boolean;
}
interface Props {
  product: Product;
}

const Product = ({ product }: Props): JSX.Element => {
  return (
    <StyledProduct>
      {/* ref={index == 0 ? firstItemRef : null} */}
      <img className="food_img" src={product.imageUrl} alt="" />
      <div className="content">
        <StyledContentText $title={true}>{product.title}</StyledContentText>
        <StyledContentText $description={true}>{product.description}</StyledContentText>
        <StyledContentPrice>
          <div>{product.discount}</div>
          <div>{product.price}</div>
          <div>{product.originalPrice}</div>
          <img className="cart_btn" src="https://via.placeholder.com/50x50" alt="" />
        </StyledContentPrice>
        {product.soldOut && <div>일시 품절</div>}
      </div>
    </StyledProduct>
  );
};

export default Product;
