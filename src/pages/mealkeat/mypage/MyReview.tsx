import React, { useEffect, useState } from "react";
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

const MyReview: React.FC = () => {
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
    <div>
      작성한 리뷰들
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
    </div>
  );
};

export default MyReview;
