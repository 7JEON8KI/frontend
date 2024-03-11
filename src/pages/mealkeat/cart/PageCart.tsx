import React, { useEffect, useState } from "react";
import { Layout } from "components/mealkeat";
import checktPath from "assets/images/icons/except.png";
import checkClickPath from "assets/images/icons/except_click.png";
import formatCurrency from "utils/formatCurrency";
import {
  MIN_PRODUCT_AMOUNT,
  MAX_PRODUCT_AMOUNT,
  DEFAULT_DELIVERY_FEE,
  FREE_SHIPPING_THRESHOLD,
} from "constants/productConstants";
import styled from "styled-components";
import scrollToTop from "utils/scrollToTop";
import { useNavigate } from "react-router-dom";
import cartApi from "apis/cartApi";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";
import { CartData, CartProduct, CartProductDTO } from "models/mealkeat/CartModels";
import { decreaseCnt } from "feature/cartSlice";
import { useDispatch } from "react-redux";

const StyledAmountBtn = styled.button.attrs({ type: "button" })`
  padding: 1rem;
  &:disabled {
    color: #d0d0d0;
  }
`;

const StyledPurchaseBtn = styled.button.attrs({ type: "button" })`
  width: 90%;
  height: 70px;
  background: #fd6f21;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: auto;
  &:disabled {
    background: #d0d0d0;
    color: #282828;
  }
`;

const PageCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleSelectAllClick = () => {
    const prev = selectAll;
    setSelectAll(!prev);

    const newCartProduct = cartProduct.map(item => ({ ...item, selected: !prev }));
    setCartProduct(newCartProduct);
    setTotalPrice(
      newCartProduct.reduce(
        (acc, cur) =>
          cur.selected
            ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
            : acc,
        0,
      ),
    );
  };

  const handleSelectItemClick = (index: number) => {
    const newCartProduct = cartProduct.map((item, i) => {
      if (i === index) {
        return { ...item, selected: !item.selected };
      }
      return { ...item };
    });
    const isAll = newCartProduct.every(item => item.selected);
    setSelectAll(isAll);
    setTotalPrice(
      newCartProduct.reduce(
        (acc, cur) =>
          cur.selected
            ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
            : acc,
        0,
      ),
    );
    setCartProduct(newCartProduct);
  };

  const handleAmountBtnClick = (index: number, type: "plus" | "minus") => {
    const newCartProduct = cartProduct.map((item, i) => {
      if (i === index) {
        return { ...item, cartProductCnt: type === "plus" ? item.cartProductCnt + 1 : item.cartProductCnt - 1 };
      }
      return { ...item };
    });
    setTotalPrice(
      newCartProduct.reduce(
        (acc, cur) =>
          cur.selected
            ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
            : acc,
        0,
      ),
    );
    setCartProduct(newCartProduct);
  };

  const handleDeleteSelected = () => {
    // 카트 아이템 삭제
    cartProduct
      .filter(item => item.selected)
      .forEach(item =>
        cartApi.deleteCart({ productId: item.productId }).then(() => {
          dispatch(decreaseCnt());
        }),
      );
    const newCartProduct = cartProduct.filter(item => !item.selected);

    setCartProduct(newCartProduct);
    setTotalPrice(
      newCartProduct.reduce(
        (acc, cur) =>
          cur.selected
            ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
            : acc,
        0,
      ),
    );
  };

  // cartProducts
  const getCarts = async () => {
    const response = await cartApi.getCarts(); // cartApi 호출로부터 응답 받기
    const cartData: CartData = response?.data; // CartData 타입 사용
    const cartProducts: CartProduct[] = cartData.cartProducts.map((el: CartProductDTO) => ({
      ...el,
      selected: true,
    }));

    setTotalPrice(
      cartProducts.reduce(
        (acc, cur) =>
          cur.selected
            ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
            : acc,
        0,
      ),
    );
    setCartProduct(cartProducts);
  };

  useEffect(() => {
    getCarts();
  }, []);

  const countSelectedItems = () => {
    return cartProduct.filter(item => item.selected).length;
  };
  return (
    <Layout>
      <div style={{ display: "flex", width: "90%", margin: "60px auto 0" }}>
        <main style={{ width: "75%", minHeight: "100vh" }}>
          <section
            style={{
              display: "flex",
              margin: "auto",
              width: "90%",
              justifyContent: "space-between",
              borderBottom: "1px solid gray",
              padding: "24px",
              alignItems: "end",
            }}
          >
            <div style={{ fontSize: "40px", fontWeight: "bold", color: "#282828" }}>장바구니</div>
            <div style={{ fontSize: "24px" }}>
              <span style={{ color: "#fd6f21", fontWeight: "bold" }}>01. 장바구니</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#282828" }}>02. 주문서 작성</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#282828" }}>03. 주문 완료</span>
            </div>
          </section>
          <section style={{ fontSize: "32px", color: "#282828", width: "90%", padding: "24px", margin: "auto" }}>
            상품정보
          </section>
          <section style={{ border: "1px solid #f4f4f4", width: "90%", margin: "auto" }}>
            <div
              style={{
                height: "55px",
                display: "flex",
                gap: "1rem",
                padding: "1.5rem 1rem",
                fontSize: "20px",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundImage: `url(${selectAll ? checkClickPath : checktPath})`,
                  backgroundSize: "cover",
                }}
                onClick={handleSelectAllClick}
                title="전체선택"
                aria-selected={selectAll}
              ></button>
              전체선택
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  border: "1px solid #d0d0d0",
                  color: "#fd6f21",
                }}
                onClick={() => handleDeleteSelected()}
              >
                선택삭제
              </button>
            </div>
            {cartProduct.length > 0 ? (
              cartProduct.map((product, i) => (
                <div
                  key={i}
                  style={{
                    height: "210px",
                    display: "flex",
                    gap: "1rem",
                    padding: "1.5rem 1rem",
                    borderTop: "1px solid #d0d0d0",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundImage: `url(${product?.selected ? checkClickPath : checktPath})`,
                      backgroundSize: "cover",
                    }}
                    onClick={() => {
                      handleSelectItemClick(i);
                    }}
                  ></button>
                  <img src={product.thumbnailImageUrl} style={{ width: "150px", height: "150px" }} draggable={false} />
                  <div
                    style={{
                      width: "550px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <span>{product.productName}</span>
                    {product.discountRate > 0 ? (
                      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-end" }}>
                        <span style={{ color: "#fd6f21", fontSize: "1.5rem" }}>{product.discountRate}%</span>
                        <span style={{ fontSize: "1.5rem" }}>
                          {formatCurrency({
                            amount: calculateDiscountPrice({
                              price: product.price,
                              discountRate: product.discountRate,
                            }),
                            locale: "ko-KR",
                          })}
                        </span>
                        <span
                          style={{
                            color: "#d0d0d0",
                            textDecoration: "line-through",
                          }}
                        >
                          {formatCurrency({
                            amount: product.price,
                            locale: "ko-KR",
                          })}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "1.5rem" }}>
                        {formatCurrency({
                          amount: product.price,
                          locale: "ko-KR",
                        })}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      width: "200px",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <StyledAmountBtn
                      onClick={() => handleAmountBtnClick(i, "minus")}
                      disabled={product.cartProductCnt <= MIN_PRODUCT_AMOUNT || !product.selected}
                      aria-disabled={product.cartProductCnt <= MIN_PRODUCT_AMOUNT || !product.selected}
                    >
                      -
                    </StyledAmountBtn>
                    <span>{product.cartProductCnt} 개</span>
                    <StyledAmountBtn
                      onClick={() => handleAmountBtnClick(i, "plus")}
                      disabled={product.cartProductCnt >= MAX_PRODUCT_AMOUNT || !product.selected}
                      aria-disabled={product.cartProductCnt >= MAX_PRODUCT_AMOUNT || !product.selected}
                    >
                      +
                    </StyledAmountBtn>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  height: "210px",
                  padding: "1.5rem 1rem",
                  borderTop: "1px solid #d0d0d0",
                  fontSize: "1.5rem",
                  fontFamily: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  장바구니에 담은 상품이 없습니다.
                </span>
              </div>
            )}
          </section>
        </main>
        <aside style={{ width: "25%", minHeight: "100vh" }}>
          <div
            style={{
              width: "90%",
              height: "400px",
              border: "5px solid #282828",
              borderRadius: "5px",
              position: "sticky",
              top: "100px",
              display: "flex",
              flexDirection: "column",
              padding: "5%",
            }}
          >
            <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>40,000원 이상 무료배송</span>
            <span
              style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}
            >{`선택한 상품 (${countSelectedItems()})`}</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>총 상품 금액</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                {formatCurrency({ amount: totalPrice, locale: "ko-KR" })}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>배송비</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                {formatCurrency({
                  amount:
                    countSelectedItems() === 0 ? 0 : totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE,
                  locale: "ko-KR",
                })}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>총 주문 금액</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold", color: "#fd6f21" }}>
                {formatCurrency({
                  amount:
                    countSelectedItems() === 0
                      ? 0
                      : totalPrice >= FREE_SHIPPING_THRESHOLD
                        ? totalPrice
                        : totalPrice + DEFAULT_DELIVERY_FEE,
                  locale: "ko-KR",
                })}
              </span>
            </div>
            <span style={{ margin: "1rem 0" }}>
              결제 및 계좌 안내 시 상호명은 <span style={{ color: "#fd6f21" }}>밀킷</span>으로 표기되니 참고
              부탁드립니다.
            </span>
            <StyledPurchaseBtn
              disabled={countSelectedItems() === 0}
              aria-disabled={countSelectedItems() === 0}
              onClick={() => {
                scrollToTop({});
                navigate("/payment", { state: { cartList: cartProduct.filter(el => el.selected) } });
              }}
              title="선택상품 구매하기, 클릭 시 결제 페이지로 이동"
            >
              선택상품 구매하기
            </StyledPurchaseBtn>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PageCart;
