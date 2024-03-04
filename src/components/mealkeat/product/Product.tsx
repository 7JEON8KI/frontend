import React from "react";
import { ContentPrice, ContentText, ProductContainer } from "./Product.style";
import { useNavigate } from "react-router-dom";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";
import formatCurrency from "utils/formatCurrency";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import scrollToTop from "utils/scrollToTop";
import AddCart from "assets/images/icons/add_cart.png";
import cartApi from "apis/cartApi";

interface Props {
  product: ProductResponseDTO;
}

const Product = ({ product }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleAddCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: number) => {
    e.stopPropagation();
    await cartApi.saveOrDeleteCart({ productId: productId, cartProductCnt: 1 });
  };

  return (
    <ProductContainer
      onClick={() => {
        scrollToTop({});
        navigate(`/detail/${product.productId}`);
      }}
      tabIndex={0}
    >
      <img className="food_img" src={product.thumbnailImageUrl} alt="" />
      <div className="content">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            title="찜하기 버튼"
            style={{
              cursor: "pointer",
              color: "gray", // "#FD6F21"
              fontSize: "32px",
              padding: "0 0.25rem",
              border: "1px solid lightgray",
            }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            ♥
          </button>
          <button
            style={{ width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={e => {
              handleAddCart(e, product.productId);
            }}
          >
            <img
              className="cart_btn"
              src={AddCart}
              alt="장바구니 추가 아이콘"
              style={{ width: "35px", height: "35px" }}
            />
          </button>
        </div>
        <ContentText $title={true}>{product.productName}</ContentText>
        <ContentPrice>
          <div>{product?.discountRate > 0 && `${product.discountRate}%`}</div>
          <div>
            {formatCurrency({
              amount: calculateDiscountPrice({ price: product.price, discountRate: product.discountRate }),
              locale: "ko-KR",
            })}
          </div>
          <div>{product?.discountRate > 0 && formatCurrency({ amount: product.price, locale: "ko-KR" })}</div>
        </ContentPrice>
        {product.stock === 0 && <div>일시 품절</div>}
      </div>
    </ProductContainer>
  );
};

export default Product;
