import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import formatCurrency from "utils/formatCurrency";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  orderDate: string;
  deliveryStatus: string;
  quantity: number;
  imageUrl: string;
}

const PageMypageOrder: React.FC = () => {
  const [orderProduct, setOrderProduct] = useState<Product[]>([]);
  const navigate = useNavigate();
  const goToOrderDetail = (productId: number) => {
    navigate(`detail/${productId}`);
  };
  const goToReview = (productId: number) => {
    navigate(`../review/${productId}`);
  };
  useEffect(() => {
    const dummy = Array.from({ length: 3 }).map(
      (_, i) =>
        ({
          id: i,
          name: "[지투지샵] 마이무 무뼈닭발",
          price: 1000,
          quantity: 1,
          orderDate: "2024.03.15.",
          deliveryStatus: "배송중",
          imageUrl: "https://via.placeholder.com/150x150",
        }) as Product,
    );
    setOrderProduct(dummy);
  }, []);

  return (
    <>
      <Title>최근 주문 현황</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        {orderProduct.length > 0 ? (
          orderProduct.map((product, i) => (
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
                <button
                  style={{
                    color: "#3A3A3A",
                    fontSize: "1rem",
                    margin: "1rem 1rem",
                  }}
                  onClick={() => goToOrderDetail(product.id)}
                >
                  주문 상세보기
                </button>
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
                  <span>{product.name}</span>
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
                    onClick={() => goToReview(product.id)}
                  >
                    리뷰 작성하기
                  </button>
                </div>
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
              주문한 상품이 없습니다.
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default PageMypageOrder;
