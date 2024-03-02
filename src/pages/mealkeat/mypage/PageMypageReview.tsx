import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  orderDate: string;
  selected: boolean;
}

const PageMypageReview: React.FC = () => {
  const [reviewProduct, setReviewProduct] = useState<Product[]>([]);
  const navigate = useNavigate();
  const goToReview = (productId: number) => {
    navigate(`${productId}`);
  };

  useEffect(() => {
    const dummy = Array.from({ length: 3 }).map(
      (_, i) =>
        ({
          id: i,
          name: "[지투지샵] 마이무 무뼈닭발",
          price: 1000,
          quantity: 1,
          imageUrl: "https://via.placeholder.com/150x150",
          orderDate: "2024.03.15.",
          selected: true,
        }) as Product,
    );
    setReviewProduct(dummy);
  }, []);

  return (
    <>
      <Title>리뷰</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        <div
          style={{
            height: "55px",
            display: "flex",
            fontSize: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              textAlign: "center",
              alignItems: "center",
              width: "50%",
              height: "100%",
              border: "1px solid #d0d0d0",
            }}
          >
            리뷰 작성이 가능한 상품
          </button>
          <button
            style={{
              textAlign: "center",
              alignItems: "center",
              width: "50%",
              height: "100%",
              border: "1px solid #d0d0d0",
            }}
          >
            작성한 리뷰
          </button>
        </div>

        {reviewProduct.length > 0 ? (
          reviewProduct.map((product, i) => (
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
                <span>{product.name}</span>
                <span>{product.orderDate} 구매</span>
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
              리뷰 작성이 가능한 상품이 없습니다.
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default PageMypageReview;
