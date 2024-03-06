import React, { useEffect } from "react";
import { Layout } from "components/mealkeat";
import { useNavigate, useLocation } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";
import formatCurrency from "utils/formatCurrency";

const PagePaymentComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentInfo = location?.state?.paymentResult;

  useEffect(() => {
    if (!paymentInfo) {
      navigate("/", { replace: true });
      window.alert("잘못된 접근입니다.");
    }
  }, []);

  return paymentInfo ? (
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
                display: "flex",
                flexDirection: "column",
                padding: "5%",
                height: "500px",
              }}
            >
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>결제완료</span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>총 상품 금액</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  {formatCurrency({ amount: paymentInfo.totalPrice, locale: "ko-KR" })}원
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
                    - {formatCurrency({ amount: paymentInfo.discountPrice, locale: "ko-KR" })}원
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>배송비</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  + {formatCurrency({ amount: paymentInfo.shippingPrice, locale: "ko-KR" })}원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>총 결제 금액</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold", color: "#fd6f21" }}>
                  {formatCurrency({
                    amount: paymentInfo.totalPrice + paymentInfo.shippingPrice - paymentInfo.discountPrice,
                    locale: "ko-KR",
                  })}
                  원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>주문번호</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>{paymentInfo.orderNumber}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>결제일시</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>{paymentInfo.paidAt}</span>
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
                navigate("/mypage/order");
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
  ) : (
    <></>
  );
};

export default PagePaymentComplete;
