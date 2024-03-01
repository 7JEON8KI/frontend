import React, { useEffect, useState } from "react";
import { Title } from "./PageMypageLike.style";
import { LuImagePlus } from "react-icons/lu";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  orderDate: string;
  selected: boolean;
  reviewScore: number;
}

const ModalReview: React.FC = () => {
  const [reviewProduct, setReviewProduct] = useState<Product[]>([]);
  const [reviewScore, setReviewScore] = useState<number>(0);
  const handleHeartClick = (score: number) => {
    setReviewScore(score);
  };

  useEffect(() => {
    const dummy = Array.from({ length: 1 }).map(
      (_, i) =>
        ({
          id: i,
          name: "[지투지샵] 마이무 무뼈닭발",
          price: 1000,
          quantity: 1,
          imageUrl: "https://via.placeholder.com/150x150",
          orderDate: "2024.03.15.",
          selected: true,
          reviewScore: 0,
        }) as Product,
    );
    setReviewProduct(dummy);
  }, []);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      hearts.push(
        <span
          key={i}
          style={{
            cursor: "pointer",
            color: i <= reviewScore ? "#FD6F21" : "grey",
            fontSize: "30px",
          }}
          onClick={() => handleHeartClick(i)}
        >
          ♥
        </span>,
      );
    }
    return hearts;
  };

  return (
    <>
      <Title>리뷰 등록</Title>
      <section style={{ background: "#f4f4f4", width: "90%", margin: "auto" }}>
        {reviewProduct.length > 0 ? (
          reviewProduct.map((product, i) => (
            <>
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
                  <div style={{ marginBottom: "10px" }}>
                    <div>{renderHearts()}</div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "10px", padding: "1rem" }}>
                <span
                  style={{
                    width: "550px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  사진첨부
                </span>
                <div>
                  <LuImagePlus
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "10px",
                      border: "2px dashed #d0d0d0",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  />
                  {/* 사진 업로드 로직 */}
                </div>
              </div>
              <div style={{ marginBottom: "10px", padding: "1rem" }}>
                <span
                  style={{
                    width: "550px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  상세리뷰
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <textarea
                    placeholder="리뷰를 작성해주세요."
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      padding: "10px",
                      margin: "10px",
                      border: "1px solid #d0d0d0",
                    }}
                  ></textarea>
                </div>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#fd6f21",
                  color: "white",
                  border: "none",
                }}
              >
                등록하기
              </button>
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
              리뷰 작성이 가능한 상품이 없습니다.
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default ModalReview;
