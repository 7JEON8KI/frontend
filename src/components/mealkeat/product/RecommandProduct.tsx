import React from "react";
import { MiniProduct, MiniContentText, MiniContentPrice } from "./RecommandProduct.style";
import { useNavigate } from "react-router-dom";
import formatCurrency from "utils/formatCurrency";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import scrollToTop from "utils/scrollToTop";
import AddCart from "assets/images/icons/add_cart.png";
import cartApi from "apis/cartApi";
import { ProductRecommandResponse } from "models/mealkeat/RecommandModels";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";

interface Props {
  product: ProductResponseDTO | ProductRecommandResponse;
}

interface DisplayInfo {
  productId: number;
  thumbnailImageUrl: string;
  stock: number;
  price: number;
  discountRate: number;
  productName: string;
}

const RecommandProduct = ({ product }: Props): JSX.Element => {
  const navigate = useNavigate();

  const displayInfo = (): DisplayInfo => {
    if ("mainImgUrl" in product) {
      return {
        thumbnailImageUrl: product.mainImgUrl,
        price: product?.price ? Number(product.price) : 0,
        stock: 1,
        productId: product?.productId ? Number(product.productId) : 1,
        discountRate: product?.discountRate ? Number(product.discountRate) : 0,
        productName: product.productName,
      };
    } else {
      return {
        thumbnailImageUrl: product.thumbnailImageUrl,
        price: product.price,
        stock: 1,
        productId: product.productId,
        discountRate: product.discountRate,
        productName: product.productName,
      };
    }
  };

  const productInfo: DisplayInfo = displayInfo();

  const handleAddCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productId: number) => {
    e.stopPropagation();
    await cartApi.saveOrDeleteCart({ productId: productId, cartProductCnt: 1 });
  };

  return (
    <MiniProduct
      onClick={() => {
        scrollToTop({});
        navigate(`/detail/${productInfo.productId}`);
      }}
      tabIndex={0}
    >
      <img className="food_img" src={productInfo.thumbnailImageUrl} alt="" />
      <div className="content">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{ width: "25px", height: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={e => {
              handleAddCart(e, productInfo.productId);
            }}
          >
            <img
              className="cart_btn"
              src={AddCart}
              alt="장바구니 추가 아이콘"
              style={{ width: "25px", height: "25px" }}
            />
          </button>
        </div>
        <MiniContentText $title={true}>{productInfo.productName}</MiniContentText>
        <MiniContentPrice>
          <div>{productInfo?.discountRate > 0 && `${productInfo.discountRate}%`}</div>
          <div>
            {formatCurrency({
              amount: calculateDiscountPrice({ price: productInfo.price, discountRate: productInfo.discountRate }),
              locale: "ko-KR",
            })}
          </div>
        </MiniContentPrice>
        {productInfo.stock === 0 && <div>일시 품절</div>}
      </div>
    </MiniProduct>
  );
};

export default RecommandProduct;
