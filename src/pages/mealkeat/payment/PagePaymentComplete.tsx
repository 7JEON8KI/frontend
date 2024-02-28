import React from "react";
import { Layout } from "components/mealkeat";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";
import formatCurrency from "utils/formatCurrency";

const PagePaymentComplete: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div style={{ display: "flex", width: "90%", margin: "60px auto 0" }}>
        <main style={{ width: "75%", minHeight: "100vh", margin: "auto" }}>
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
            <div style={{ fontSize: "40px", fontWeight: "bold", color: "#282828" }}>주문 완료</div>
            <div style={{ fontSize: "24px" }}>
              <span style={{ color: "#282828" }}>01. 장바구니</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#282828" }}>02. 주문서 작성</span>
              <span style={{ padding: "0 10px", color: "#282828" }}>&rarr;</span>
              <span style={{ color: "#fd6f21", fontWeight: "bold" }}>03. 주문 완료</span>
            </div>
          </section>
          <section
            style={{
              width: "40%",
              margin: "3rem auto",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div
              style={{
                width: "90%",
                border: "5px solid #282828",
                borderRadius: "5px",
                background: "#f4f4f4",
                display: "flex",
                flexDirection: "column",
                padding: "5%",
              }}
            >
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>결제완료</span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>총 상품 금액</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  {formatCurrency({ amount: 110000, locale: "ko-KR" })}원
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
                    amount: 92000,
                    locale: "ko-KR",
                  })}
                  원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>주문번호</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>20240211012345</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>적립 포인트</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>920점</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>결제일시</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>2024.02.10. 17:33:55</span>
              </div>
            </div>
            <button
              type="button"
              style={{
                width: "80%",
                height: "70px",
                color: "white",
                background: "#fd6f21",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              title="클릭 시 주문내역 페이지로 이동"
              onClick={() => {
                scrollToTop({});
                // navigate("/order");
              }}
            >
              주문내역 보러가기
            </button>
            <button
              type="button"
              style={{
                width: "80%",
                height: "70px",
                color: "#fd6f21",
                border: "1px solid #fd6f21",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
              onClick={() => {
                scrollToTop({});
                navigate("/list");
              }}
              title="클릭 시 전체상품 페이지로 이동"
            >
              계속 쇼핑하기
            </button>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default PagePaymentComplete;
