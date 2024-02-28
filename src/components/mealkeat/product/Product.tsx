import React from "react";
import {
  StyledContentPrice,
  StyledContentText,
  StyledProduct,
  StyledMiniProduct,
  StyledMiniContentText,
  StyledMiniContentPrice,
} from "./Product.style";
import { useNavigate } from "react-router-dom";

interface Product {
  imageUrl: string;
  title: string;
  description?: string;
  discount: string;
  price: string;
  originalPrice: string;
  soldOut: boolean;
}
interface Props {
  product: Product;
  miniSize?: boolean;
}

const Product = ({ product, miniSize }: Props): JSX.Element => {
  const navigate = useNavigate();
  return miniSize ? (
    <StyledMiniProduct onClick={() => navigate("/detail")} tabIndex={0}>
      {/* ref={index == 0 ? firstItemRef : null} */}
      <img className="food_img" src={product.imageUrl} alt="" />
      <div className="content">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{ width: "25px", height: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="cart_btn"
              src="https://via.placeholder.com/25x25"
              alt=""
              style={{ width: "25px", height: "25px" }}
            />
          </button>
          <button
            style={{ width: "25px", height: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="cart_btn"
              src="https://via.placeholder.com/25x25"
              alt=""
              style={{ width: "25px", height: "25px" }}
            />
          </button>
        </div>
        <StyledMiniContentText $title={true}>{product.title}</StyledMiniContentText>
        <StyledMiniContentPrice>
          <div>{product.discount}</div>
          <div>{product.price}</div>
        </StyledMiniContentPrice>
        {product.soldOut && <div>일시 품절</div>}
      </div>
    </StyledMiniProduct>
  ) : (
    <StyledProduct onClick={() => navigate("/detail")} tabIndex={0}>
      {/* ref={index == 0 ? firstItemRef : null} */}
      <img className="food_img" src={product.imageUrl} alt="" />
      <div className="content">
        <StyledContentText $title={true}>{product.title}</StyledContentText>
        <StyledContentText $description={true}>{product.description}</StyledContentText>
        <StyledContentPrice>
          <div>{product.discount}</div>
          <div>{product.price}</div>
          <div>{product.originalPrice}</div>
          <button
            style={{ width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <img
              className="cart_btn"
              src="https://via.placeholder.com/35x35"
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
          </button>
        </StyledContentPrice>
        {product.soldOut && <div>일시 품절</div>}
      </div>
    </StyledProduct>
  );
};

export default Product;
