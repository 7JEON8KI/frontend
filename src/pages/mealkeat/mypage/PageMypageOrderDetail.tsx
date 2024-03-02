import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import formatCurrency from "utils/formatCurrency";

interface OrderDetail {
  id: number;
  productName: string;
  price: number;
  orderDate: string;
  orderId: number;
  orderMemberName: string;
  orderMemberPhone: string;
  orderMemberZipcode: string;
  orderMemberAddress: string;
  orderType: string;
  orderPrice: number;
  deliveryStatus: string;
  quantity: number;
  imageUrl: string;
}

const PageMypageOrderDetail: React.FC = () => {
  const [orderProduct, setOrderProduct] = useState<OrderDetail[]>([]);

  useEffect(() => {
    const dummy = Array.from({ length: 1 }).map(
      (_, i) =>
        ({
          id: i,
          productName: "[지투지샵] 마이무 무뼈닭발",
          price: 1000,
          quantity: 1,
          orderDate: "2024.03.15.",
          orderId: 20240315123456,
          orderMemberName: "홍길동",
          orderMemberPhone: "010-1234-5678",
          orderMemberZipcode: "12345",
          orderMemberAddress: "서울시 강남구",
          orderType: "현대카드 / 일시불",
          orderPrice: 1000,
          deliveryStatus: "배송중",
          imageUrl: "https://via.placeholder.com/150x150",
        }) as OrderDetail,
    );
    setOrderProduct(dummy);
  }, []);

  return (
    <>
      <Title>주문상세</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        {orderProduct.length > 0 ? (
          orderProduct.map((product, i) => (
            <>
              <div
                key={i}
                style={{
                  border: "1px solid #d0d0d0",
                  borderRadius: "10px",
                  margin: "1rem 0",
                }}
              >
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    key={i}
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      padding: "1.5rem 1rem",
                    }}
                  >
                    <span>{product.orderDate}</span> 주문
                  </div>
                  <div
                    style={{
                      color: "#3A3A3A",
                      fontSize: "1rem",
                      margin: "1rem 1rem",
                    }}
                    // onClick={}
                  >
                    주문번호: <span>{product.orderId}</span>
                  </div>
                </div>
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
                  <img src={product.imageUrl} style={{ width: "150px", height: "150px" }} />
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
                    <span>{product.deliveryStatus}</span>
                    <span>{product.productName}</span>
                    <span>{formatCurrency({ amount: product.price, locale: "ko-KR" })}원</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1rem",
                      gap: "1rem",
                    }}
                  >
                    <button
                      style={{
                        width: "250px",
                        height: "50px",
                        padding: "0.5rem 1rem",
                        fontSize: "1rem",
                        border: "2px solid #fd6f21",
                        color: "#fd6f21",
                        fontWeight: "bold",
                        backgroundColor: "white",
                      }}
                      // onClick={handleDeleteSelected}
                    >
                      리뷰 작성하기
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      padding: "1.5rem 1rem",
                    }}
                  >
                    받는사람 정보
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "1rem",
                      borderTop: "2px solid #3A3A3A",
                      borderBottom: "1px solid #d0d0d0",
                      margin: "1rem 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        color: "#787777",
                      }}
                    >
                      <span>받는 사람</span>
                      <span>연락처</span>
                      <span>받는 주소</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                      }}
                    >
                      <span>{product.orderMemberName}</span>
                      <span>{product.orderMemberPhone}</span>
                      <span>
                        ({product.orderMemberZipcode}) {product.orderMemberAddress}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      padding: "1.5rem 1rem",
                    }}
                  >
                    결제 정보
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "1rem",
                      borderTop: "2px solid #3A3A3A",
                      borderBottom: "1px solid #d0d0d0",
                      margin: "1rem 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        color: "#787777",
                      }}
                    >
                      <span>결제 수단</span>
                      <span>총 상품 가격</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                      }}
                    >
                      <span>{product.orderType}</span>
                      <span>{formatCurrency({ amount: product.orderPrice, locale: "ko-KR" })}원</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
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
              주문한 상품이 없습니다.
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default PageMypageOrderDetail;
