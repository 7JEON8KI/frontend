import React from "react";
import { ContentPrice, ContentText, ProductContainer } from "./Product.style";
import { useNavigate } from "react-router-dom";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";
import formatCurrency from "utils/formatCurrency";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import scrollToTop from "utils/scrollToTop";
import AddCart from "assets/images/icons/add_cart.png";
import cartApi from "apis/cartApi";
import likeApi from "apis/likeApi";
import { useDispatch } from "react-redux";
import { setCnt } from "feature/cartSlice";

interface Props {
  product: ProductResponseDTO;
}

const Product = ({ product }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const [likeProduct, setLikeProduct] = React.useState<number>(product.isLike);
  const navigate = useNavigate();

  const handleAddCart = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    productId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) {
      alert("일시 품절된 상품입니다.");
      return;
    }
    await cartApi
      .saveCart({ productId: productId, cartProductCnt: 1 })
      .then(() => {
        cartApi.getCartsCount().then(res => {
          dispatch(setCnt(res.data));
        });

        alert("장바구니에 상품이 추가되었습니다.");
      })
      .catch(err => {
        console.error(err);
        alert("상품 추가에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (likeProduct === 1) {
      // 현재 찜한 상태이면 찜 해제 API 호출
      await likeApi.deleteLikes(product.productId);
      setLikeProduct(0);
    } else {
      // 현재 찜하지 않은 상태이면 찜하기 API 호출
      await likeApi.saveLikes(product.productId);
      setLikeProduct(1);
    }
  };

  const moveProductDetail = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    e.stopPropagation();
    scrollToTop({});
    navigate(`/detail/${product.productId}`);
  };

  return (
    <ProductContainer
      onClick={moveProductDetail}
      onKeyDown={e => {
        if (e.key === "Enter") {
          moveProductDetail(e);
        }
      }}
      tabIndex={0}
    >
      <img draggable={false} className="food_img" src={product.thumbnailImageUrl} alt="" />
      <div className="content">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            title="찜하기 버튼"
            style={{
              cursor: "pointer",
              color: likeProduct === 1 ? "#FD6F21" : "gray",
              fontSize: "32px",
              padding: "0 0.25rem",
              border: "1px solid lightgray",
            }}
            onClick={toggleLike}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(e);
              }
            }}
          >
            ♥
          </button>
          <button
            style={{ width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={e => {
              handleAddCart(e, product.productId);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleAddCart(e, product.productId);
              }
            }}
          >
            <img
              className="cart_btn"
              src={AddCart}
              alt="장바구니 추가 아이콘"
              style={{ width: "35px", height: "35px" }}
              draggable={false}
            />
          </button>
        </div>
        <ContentText $title={true} title={product.productName}>
          {product.productName}
        </ContentText>
        <ContentPrice $soldOut={product.stock === 0 ? true : false}>
          <div>{product?.discountRate > 0 && `${product.discountRate}%`}</div>
          <div>
            {formatCurrency({
              amount: calculateDiscountPrice({ price: product.price, discountRate: product.discountRate }),
              locale: "ko-KR",
            })}
          </div>
          <div>{product?.discountRate > 0 && formatCurrency({ amount: product.price, locale: "ko-KR" })}</div>
        </ContentPrice>
        {product.stock === 0 && (
          <div style={{ color: "#fd6f21", fontSize: "1.5rem", fontWeight: "bold" }}>일시 품절</div>
        )}
      </div>
    </ProductContainer>
  );
};

export default Product;
