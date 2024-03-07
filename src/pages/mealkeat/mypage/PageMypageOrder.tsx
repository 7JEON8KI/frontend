import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import formatCurrency from "utils/formatCurrency";
import { useNavigate } from "react-router-dom";
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

const PageMypageOrder: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const navigate = useNavigate();

  const goToOrderDetail = (orderId: number) => {
    navigate(`detail/${orderId}`, { state: { orderId: orderId } });
  };

  const goToReview = (productId: number) => {
    navigate(`../review/${productId}`, { state: { productId: productId } });
  };

  const fetchOrderHistory = async () => {
    const response = await orderHistoryApi.orderHistory();
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
      <Title>최근 주문 현황</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        {orderHistory.length > 0 ? (
          orderHistory.map(order => (
            <div
              key={order.orderId}
              style={{
                border: "1px solid #d0d0d0",
                borderRadius: "10px",
                margin: "1rem 0",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{formatDate(order.orderDate)} 주문</span>
                <button
                  style={{
                    color: "#3A3A3A",
                    fontSize: "1rem",
                  }}
                  onClick={() => goToOrderDetail(order.orderId)}
                >
                  주문 상세보기
                </button>
              </div>

              {order.orderProductDtoList.map(product => (
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
                    style={{ width: "150px", height: "150px" }}
                    draggable={false}
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
                    }}
                    onClick={() => goToReview(product.productId)}
                  >
                    리뷰 작성하기
                  </button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "1.5rem 1rem",
              borderTop: "1px solid #d0d0d0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>주문한 상품이 없습니다.</span>
          </div>
        )}
      </section>
    </>
  );
};

export default PageMypageOrder;
