/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Product } from "components/mealkeat";
import formatCurrency from "utils/formatCurrency";
import { DEFAULT_DELIVERY_FEE } from "constants/productConstants";
import styled from "styled-components";
import paymentApi from "apis/paymentApi";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IMP: any;
  }
}

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
  amount: number;
  calorie: number;
  cartProductCnt: number;
  cartProductId: number;
  discountRate: number;
  price: number;
  productDetail: string; // URL 문자열 배열로 처리할 경우 string[] 타입을 고려해야 합니다.
  productId: number;
  productName: string;
  productSubName: string;
  productType: string;
  selected: boolean;
  stock: number;
  storage: string;
  thumbnailImageUrl: string;
}

interface Order {
  productId: number;
  orderPrice: number;
  orderCount: number;
  paymentMethod: string;
  orderDiscount: number;
  productImage: string;
  receiverName: string;
  phoneNumber: string;
  orderNumber: number;
  zipcode: number;
  address: string;
  orderRequired: string;
}
interface UserInfo {
  memberId: string;
  memberEmail: string;
  memberName: string;
  memberNickname: string;
  memberPhone: string;
  memberGender: string;
  memberBirth: number[];
  createdAt: number[];
  updatedAt: number[];
  infoAddr: string;
  infoZipcode: string;
}

// 초기 상태 정의
const initialOrders: Order[] = [];

function createOrderNum() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let orderNum = year + month + day;
  for (let i = 0; i < 5; i++) {
    orderNum += Math.floor(Math.random() * 8);
  }
  return parseInt(orderNum);
}

const orderNumber = createOrderNum();

const PagePayment: React.FC = () => {
  const location = useLocation();
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [receiverName, setReceiverName] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [orderRequired, setOrderRequired] = useState<string>("");
  const [orders, setOrders] = useState(initialOrders);

  const products = location?.state?.cartList;
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await paymentApi.getUserInfo();
        // 실제 응답 구조에 따라서는 아래의 분해 할당을 조정할 필요가 있습니다.
        const { memberName, memberPhone, infoZipcode, infoAddr }: UserInfo = response.data;
        setReceiverName(memberName);
        setZipcode(infoZipcode);
        setAddress(infoAddr);
        setPhoneNumber(memberPhone);
        setOrderRequired("문 앞에 놓고 가주세요");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const countSelectedItems = () => {
    return cartProduct.filter(item => item.selected).length;
  };
  const handleSubmit = () => {
    const newOrders: Order[] = products.map(product => ({
      productId: product.productId,
      orderPrice: product.price,
      orderCount: product.cartProductCnt,
      paymentMethod: "kakaopay",
      orderDiscount: 0,
      productImage: product.thumbnailImageUrl,
      receiverName: receiverName,
      phoneNumber: phoneNumber,
      orderNumber: orderNumber,
      zipcode: parseInt(zipcode, 10),
      address,
      orderRequired,
    }));
    setOrders(newOrders);
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      requestPay();
    }
  }, [orders]);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init("imp18410150");

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: orderNumber,
        amount: totalPrice,
        name: "mealkeat",
        buyer_name: receiverName,
        buyer_tel: phoneNumber,
        buyer_addr: address,
        buyer_postcode: zipcode,
      },
      async (rsp: any) => {
        if (rsp.success) {
          // validatePayment 호출로 수정
          paymentApi
            .validatePayment(rsp.imp_uid)
            .then(res => {
              if (100 == res.response.amount) {
                // completePayment 호출로 수정
                paymentApi
                  .completePayment({ orders: orders })
                  .then(res => {
                    const msg = "결제가 완료되었습니다.";
                    alert(msg);
                  })
                  .catch(error => {
                    // 오류 처리를 더 명확하게 할 수 있습니다.
                    console.error("결제 완료 처리 중 오류 발생:", error);
                    alert("결제 완료 처리 중 오류가 발생하였습니다.");
                  });
              }
            })
            .catch(error => {
              // 오류 처리를 더 명확하게 할 수 있습니다.
              console.error("결제 검증 중 오류 발생:", error);
              alert("결제에 실패하였습니다. " + error.message);
            });
        } else {
          alert(rsp.error_msg);
        }
      },
    );
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
                type="text"
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
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
                    type="text"
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)}
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
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
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
                type="text"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
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
                type="text"
                value={orderRequired}
                onChange={e => setOrderRequired(e.target.value)}
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
            {products.length > 0 ? (
              products.map((product, i) => (
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
                  <img src={product.thumbnailImageUrl} style={{ width: "150px", height: "150px" }} />
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
                    <span>{product.cartProductCnt} 개</span>
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
                // handleSubmit 함수가 완료될 때까지 기다립니다.
                handleSubmit();
                // navigate("/payment/complete");
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
