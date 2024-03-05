/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout } from "components/mealkeat";
import formatCurrency from "utils/formatCurrency";
import { DEFAULT_DELIVERY_FEE, FREE_SHIPPING_THRESHOLD } from "constants/productConstants";
import paymentApi from "apis/paymentApi";
import { useLocation, useNavigate } from "react-router-dom";
import Iamport, { RequestPayParams, RequestPayResponse } from "iamport-typings"; // 아임포트 타입 라이브러리 추가
import { PurchaseBtn } from "./PagePayment.style";
import { CartProduct } from "models/mealkeat/CartModels";
import calculateDiscountPrice from "utils/calculateDiscoundPrice";

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

export interface ValidateResponse {
  channel: string;
  escrow: boolean;
  name: string;
  amount: number;
  currency: string;
  status: string;
  payMethod: string;
  merchantUid: string;
  pgProvider: string;
  applyNum: string;
  bankCode?: string | null;
  bankName?: string | null;
  cardCode?: string | null;
  cardName?: string | null;
  cardNumber?: string | null;
  cardQuota: number;
  cardType: number;
  vbankCode?: string | null;
  vbankName?: string | null;
  vbankNum?: string | null;
  vbankHolder?: string | null;
  vbankDate: number;
  vbankIssuedAt: number;
  cancelAmount: number;
  buyerName: string;
  buyerEmail?: string | null;
  buyerTel: string;
  buyerAddr: string;
  buyerPostcode: string;
  customData?: string;
  startedAt: number;
  failedAt: number;
  cancelledAt: number;
  failReason?: string | null;
  cancelReason?: string | null;
  receiptUrl: string;
  cancelHistory: string[];
  cashReceiptIssued: boolean;
  customerUid?: string | null;
  customerUidUsage?: string;
  impUid: string;
  pgTid: string;
  paidAt: number;
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
  orderNumber: string;
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
  return "merchant_" + orderNum;
}

const orderNumber = createOrderNum();

const PagePayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartProduct: CartProduct[] = location?.state?.cartList;
  const [totalPrice, setTotalPrice] = useState<number>(
    cartProduct?.reduce(
      (acc, cur) =>
        cur.selected
          ? acc + calculateDiscountPrice({ price: cur.price, discountRate: cur.discountRate }) * cur.cartProductCnt
          : acc,
      0,
    ),
  );
  const [shippingPrice, setShippingPrice] = useState<number>(
    totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE,
  );
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [receiverName, setReceiverName] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [orderRequired, setOrderRequired] = useState<string>("");
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await paymentApi.getUserInfo();
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
    const newOrders: Order[] = cartProduct.map(product => ({
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
      address: address,
      orderRequired: orderRequired,
    }));
    setOrders(newOrders);
  };

  const requestPay = () => {
    const { IMP } = window;
    if (IMP) {
      IMP.init("imp18410150");

      const params: RequestPayParams = {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: orderNumber,
        amount: totalPrice,
        name: "mealkeat",
        buyer_name: receiverName,
        buyer_tel: phoneNumber,
        buyer_addr: address,
        buyer_postcode: zipcode,
      };

      IMP.request_pay(params, onPaymentAccepted);
    }
  };

  const onPaymentAccepted = (response: RequestPayResponse) => {
    if (response.success && response.imp_uid) {
      const { imp_uid } = response;

      paymentApi
        .validatePayment(imp_uid)
        .then(res => {
          if (totalPrice == res.data.response.amount) {
            // completePayment 호출로 수정
            paymentApi
              .completePayment({ orderSaveDtos: orders })
              .then(res => {
                const msg = "결제가 완료되었습니다.";
                console.log("결제가 완료되었습니다.", res);
                window.alert(msg);
                // navigate()
              })
              .catch(error => {
                console.error("결제 완료 처리 중 오류 발생:", error);
                window.alert("결제 완료 처리 중 오류가 발생하였습니다.");
              });
          } else {
            console.error("결제 처리 중 오류가 발생했습니다. 금액이 맞지 않음.");
            window.alert("결제 처리 중 오류가 발생했습니다.");
          }
        })
        .catch(error => {
          console.error("결제 검증 중 오류 발생:", error);
          window.alert("결제에 실패하였습니다. " + error.message);
        });
    } else {
      window.alert(response.error_msg);
    }
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    if (countSelectedItems() === 0) {
      window.alert("잘못된 접근입니다.");
      navigate(-1);
    }
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    if (countSelectedItems() === 0) {
      window.alert("구매 가능한 상품이 없습니다.");
    }
    if (orders.length > 0) {
      requestPay();
    }
  }, [orders]);

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
                    type="number"
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
                type="number"
                value={phoneNumber}
                maxLength={11}
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
            {cartProduct.length > 0 ? (
              cartProduct.map(product => (
                <div
                  key={product.productId}
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
                    <span>
                      {formatCurrency({
                        amount: calculateDiscountPrice({ price: product.price, discountRate: product.discountRate }),
                        locale: "ko-KR",
                      })}
                      원
                    </span>
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
                  - {formatCurrency({ amount: discountPrice, locale: "ko-KR" })}원
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ padding: "0.5rem 0 0.5rem 1rem", fontSize: "1.25rem" }}>쿠폰</span>
                <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                  - {formatCurrency({ amount: discountPrice, locale: "ko-KR" })}원
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>배송비</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.25rem" }}>
                + {formatCurrency({ amount: shippingPrice, locale: "ko-KR" })}원
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold" }}>총 결제 금액</span>
              <span style={{ padding: "0.5rem 0", fontSize: "1.5rem", fontWeight: "bold", color: "#fd6f21" }}>
                {formatCurrency({
                  amount: totalPrice + shippingPrice,
                  locale: "ko-KR",
                })}
                원
              </span>
            </div>
            <span style={{ padding: "0.5rem 0", fontSize: "1rem" }}>40,000원 이상 무료배송</span>
            <span style={{ margin: "1rem 0" }}>
              결제 및 계좌 안내 시 상호명은 <span style={{ color: "#fd6f21" }}>밀킷</span>으로 표기되니 참고
              부탁드립니다.
            </span>
            <PurchaseBtn
              disabled={countSelectedItems() === 0}
              aria-disabled={countSelectedItems() === 0}
              onClick={() => {
                handleSubmit();
              }}
              title="선택상품 구매하기, 클릭 시 주문 완료 페이지로 이동"
            >
              결제하기
            </PurchaseBtn>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PagePayment;
