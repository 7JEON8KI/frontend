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
import { ProductResponse } from "models/mealkeat/ProductModels";
import formatCurrency from "utils/formatCurrency";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";

interface Props {
  product: ProductResponse;
  miniSize?: boolean;
}

const Product = ({ product, miniSize }: Props): JSX.Element => {
  const navigate = useNavigate();
  return miniSize ? (
    <StyledMiniProduct onClick={() => navigate(`/detail/${product.productId}`)} tabIndex={0}>
      {/* ref={index == 0 ? firstItemRef : null} */}
      <img className="food_img" src={product.thumbnailImageUrl} alt="" />
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
        <StyledMiniContentText $title={true}>{product.productName}</StyledMiniContentText>
        <StyledMiniContentPrice>
          <div>{product?.discountRate > 0 && `${product.discountRate}%`}</div>
          <div>
            {formatCurrency({
              amount: calculateDiscountPrice({ price: product.price, discountRate: product.discountRate }),
              locale: "ko-KR",
            })}
          </div>
        </StyledMiniContentPrice>
        {product.stock === 0 && <div>일시 품절</div>}
      </div>
    </StyledMiniProduct>
  ) : (
    <StyledProduct onClick={() => navigate(`/detail/${product.productId}`)} tabIndex={0}>
      {/* ref={index == 0 ? firstItemRef : null} */}
      <img className="food_img" src={product.thumbnailImageUrl} alt="" />
      <div className="content">
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
        </div>
        <StyledContentText $title={true}>{product.productName}</StyledContentText>
        <StyledContentText $description={true}>{product.productDetail}</StyledContentText>
        <StyledContentPrice>
          <div>{product?.discountRate > 0 && `${product.discountRate}%`}</div>
          <div>
            {formatCurrency({
              amount: calculateDiscountPrice({ price: product.price, discountRate: product.discountRate }),
              locale: "ko-KR",
            })}
          </div>
          <div>{product?.discountRate > 0 && formatCurrency({ amount: product.price, locale: "ko-KR" })}</div>
        </StyledContentPrice>
        {product.stock === 0 && <div>일시 품절</div>}
      </div>
    </StyledProduct>
  );
};

export default Product;
