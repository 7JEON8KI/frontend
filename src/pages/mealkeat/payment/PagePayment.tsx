import React, { useEffect, useState } from "react";
import { Layout } from "components/mealkeat";
import formatCurrency from "utils/formatCurrency";
import { DEFAULT_DELIVERY_FEE } from "constants/productConstants";
import styled from "styled-components";
import scrollToTop from "utils/scrollToTop";
import { useNavigate } from "react-router-dom";

const StyledPurchaseBtn = styled.button.attrs({ type: "button" })`
  width: 90%;
  height: 60px;
  background: #fd6f21;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 1.5rem auto 0;
  &:disabled {
    background: #d0d0d0;
    color: #282828;
  }
`;
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selected: boolean;
}
const PagePayment: React.FC = () => {
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const dummy = Array.from({ length: 3 }).map(
      (_, i) =>
        ({
          id: i,
          name: "[지투지샵] 마이무 무뼈닭발",
          price: 1000,
          quantity: 1,
          imageUrl: "https://via.placeholder.com/150x150",
          selected: true,
        }) as Product,
    );
    setTotalPrice(dummy.reduce((acc, cur) => (cur.selected ? acc + cur.price * cur.quantity : acc), 0));
    setCartProduct(dummy);
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
            <div style={{ fontSize: "40px", fontWeight: "bold", color: "#282828" }}>주문서 작성</div>
            <div style={{ fontSize: "24px" }}>
              <span style={{ color: "#282828" }}>01. 장바구니</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#fd6f21", fontWeight: "bold" }}>02. 주문서 작성</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#282828" }}>03. 주문 완료</span>
            </div>
          </section>
          <section
            style={{
              fontSize: "32px",
              color: "#282828",
              width: "90%",
              padding: "24px",
              margin: "auto",
              fontWeight: "600",
            }}
          >
            배송정보
          </section>
          <section
            style={{
              background: "#f4f4f4",
              width: "90%",
              padding: "1rem 0",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>수령인</span>
              <input
                style={{
                  width: "600px",
                  height: "50px",
                  border: "1px solid black",
                  padding: "0.5rem",
                  color: "#3a3a3a",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              ></input>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>배송지</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ width: "600px", display: "flex", justifyContent: "space-between" }}>
                  <input
                    style={{
                      width: "200px",
                      height: "50px",
                      border: "1px solid black",
                      padding: "0.5rem",
                      color: "#3a3a3a",
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                    }}
                  ></input>
                  <button
                    style={{ width: "250px", height: "50px", border: "1px solid #fd6f21", color: "#fd6f21" }}
                    type="button"
                  >
                    우편번호 찾기
                  </button>
                </div>
                <input
                  style={{
                    width: "600px",
                    height: "50px",
                    border: "1px solid black",
                    padding: "0.5rem",
                    color: "#3a3a3a",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                ></input>
              </div>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>연락처</span>
              <input
                style={{
                  width: "600px",
                  height: "50px",
                  border: "1px solid black",
                  padding: "0.5rem",
                  color: "#3a3a3a",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              ></input>
            </div>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>배송시 요청사항</span>
              <input
                style={{
                  width: "600px",
                  height: "50px",
                  border: "1px solid black",
                  padding: "0.5rem",
                  color: "#3a3a3a",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              ></input>
            </div>
          </section>
          <section
            style={{
              fontSize: "32px",
              color: "#282828",
              width: "90%",
              padding: "24px",
              margin: "auto",
              fontWeight: "600",
            }}
          >
            상품정보
          </section>
          <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
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
                    justifyContent: "space-around",
                  }}
                >
                  <img draggable={false} src={product.imageUrl} style={{ width: "150px", height: "150px" }} />
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
                    <span>{product.name}</span>
                    <span>{formatCurrency({ amount: product.price, locale: "ko-KR" })}원</span>
                  </div>
                  <div
                    style={{
                      width: "150px",
                      fontWeight: "bold",
                      fontSize: "2rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span>{product.quantity} 개</span>
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
          <section style={{ fontSize: "32px", color: "#282828", width: "90%", padding: "24px", margin: "auto" }}>
            포인트
          </section>
          <section
            style={{
              background: "#f4f4f4",
              width: "90%",
              padding: "1rem 0",
              margin: "auto",
            }}
          >
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>사용 포인트</span>
              <input
                style={{
                  width: "400px",
                  height: "50px",
                  border: "1px solid black",
                  padding: "0.5rem",
                  color: "#3a3a3a",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              ></input>
              <button style={{ fontWeight: "500" }}>모두 사용</button>
              <div style={{ fontWeight: "500" }}>사용 가능 10000p</div>
            </div>
          </section>
          <section style={{ fontSize: "32px", color: "#282828", width: "90%", padding: "24px", margin: "auto" }}>
            쿠폰
          </section>
          <section
            style={{
              background: "#f4f4f4",
              width: "90%",
              padding: "1rem 0",
              margin: "auto",
            }}
          >
            <div
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>상품 쿠폰</span>
              <select
                style={{
                  width: "400px",
                  height: "50px",
                  border: "1px solid black",
                  padding: "0.5rem",
                  color: "#3a3a3a",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                <option>쿠폰 선택</option>
                <option>[신규회원] 할인쿠폰 10%</option>
              </select>
            </div>
          </section>
        </main>
        <aside style={{ width: "25%", minHeight: "100vh" }}>
          <div
            style={{
              width: "90%",
              border: "5px solid #282828",
              borderRadius: "5px",
              background: "#f4f4f4",
              position: "sticky",
              top: "100px",
              display: "flex",
              flexDirection: "column",
              padding: "5%",
            }}
          >
            <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>결제금액</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>총 상품 금액</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                {formatCurrency({ amount: totalPrice, locale: "ko-KR" })}원
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                margin: "1rem 0",
                gap: "0.1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem", fontWeight: "bold", color: "#fd6f21" }}>
                  할인 금액
                </span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem", fontWeight: "bold", color: "#fd6f21" }}>
                  - {formatCurrency({ amount: 21000, locale: "ko-KR" })}원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0 0.5rem 1rem", fontSize: "1.25rem" }}>쿠폰</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  - {formatCurrency({ amount: 11000, locale: "ko-KR" })}원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0 0.5rem 1rem", fontSize: "1.25rem" }}>포인트</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  - {formatCurrency({ amount: 10000, locale: "ko-KR" })}원
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>배송비</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                + {formatCurrency({ amount: 3000, locale: "ko-KR" })}원
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>총 결제 금액</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold", color: "#fd6f21" }}>
                {formatCurrency({
                  amount: countSelectedItems() === 0 ? 0 : totalPrice + DEFAULT_DELIVERY_FEE,
                  locale: "ko-KR",
                })}
                원
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
                navigate("/payment/complete");
              }}
              title="선택상품 구매하기, 클릭 시 주문 완료 페이지로 이동"
            >
              결제하기
            </StyledPurchaseBtn>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PagePayment;
