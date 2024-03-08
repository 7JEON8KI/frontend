import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import formatCurrency from "utils/formatCurrency";
import { useNavigate, useLocation } from "react-router-dom";
import orderHistoryApi from "apis/orderHistoryApi";

interface OrderProductDto {
  orderproductId: number;
  productId: number;
  orderProductPrice: number;
  orderProductCount: number;
  orderProductDiscount: number;
  thumbnailImageUrl: string;
  productName: string;
}

interface OrderHistory {
  orderId: number;
  orderDate: string;
  address: string;
  zipcode: string;
  receiverName: string;
  phoneNumber: string;
  orderStatus: string;
  orderNumber: number;
  orderRequired: string;
  paymentMethod: string;
  orderProductDtoList: OrderProductDto[];
}

const PageMypageOrderDetail: React.FC = () => {
  const [orderProduct, setOrderHistory] = useState<OrderHistory>();

  const location = useLocation();
  const orderId = location.state.orderId;

  const navigate = useNavigate();

  const goToReview = (productId: number) => {
    navigate(`../review/${productId}`, { state: { productId: productId } });
  };

  const fetchOrderHistory = async () => {
    const response = await orderHistoryApi.orderDetail(orderId);
    setOrderHistory(response.data);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3")
      .slice(0, -3);
  };
  return (
    <>
      <Title>주문상세</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        {orderProduct ? (
          <>
            <div
              key={orderProduct.orderId}
              style={{
                border: "1px solid #d0d0d0",
                borderRadius: "10px",
                margin: "1rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    padding: "1.5rem 1rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {formatDate(orderProduct.orderDate)} 주문
                  </span>
                </div>
                <div
                  style={{
                    color: "#3A3A3A",
                    fontSize: "1rem",
                    margin: "1rem 1rem",
                  }}
                >
                  주문번호: <span>{orderProduct.orderNumber}</span>
                </div>
              </div>
              {orderProduct.orderProductDtoList.map(product => (
                <div
                  key={product.orderproductId}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.thumbnailImageUrl}
                    alt={product.productName}
                    draggable={false}
                    style={{ width: "150px", height: "150px", marginLeft: "1rem" }}
                  />
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                      }}
                    >
                      {product.productName}
                    </span>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                      }}
                    >
                      {formatCurrency({ amount: product.orderProductPrice, locale: "ko-KR" })}
                    </span>
                    <span
                      style={{
                        fontSize: "1.2rem",
                      }}
                    >
                      수량: {product.orderProductCount}
                    </span>
                  </div>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "1rem",
                      border: "2px solid #fd6f21",
                      color: "#fd6f21",
                      fontWeight: "bold",
                      backgroundColor: "white",
                      marginRight: "1rem",
                    }}
                    onClick={() => goToReview(product.productId)}
                  >
                    리뷰 작성하기
                  </button>
                </div>
              ))}
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
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      받는 사람
                    </span>
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      연락처
                    </span>
                    <span>받는 주소</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                    }}
                  >
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      {orderProduct.receiverName}
                    </span>
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      {orderProduct.phoneNumber}
                    </span>
                    <span>
                      ({orderProduct.zipcode}) {orderProduct.address}
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
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      결제 수단
                    </span>
                    <span>총 상품 가격</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "1rem",
                    }}
                  >
                    <span
                      style={{
                        marginBottom: "0.5rem",
                      }}
                    >
                      {orderProduct.paymentMethod}
                    </span>
                    <span>
                      {" "}
                      {formatCurrency({
                        amount: orderProduct.orderProductDtoList.reduce(
                          (total, product) => total + product.orderProductPrice * product.orderProductCount,
                          0,
                        ),
                        locale: "ko-KR",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
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
            주문한 상품이 없습니다.
          </div>
        )}
      </section>
    </>
  );
};

export default PageMypageOrderDetail;
