import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reviewApi from "apis/reviewApi";

interface Product {
  productId: number;
  productName: string;
  thumbnailImageUrl: string;
  orderDate: string;
}

const Reviewable: React.FC = () => {
  const [reviewProduct, setReviewProduct] = useState<Product[]>([]);

  const navigate = useNavigate();
  const goToReview = (productId: number) => {
    navigate(`../review/${productId}`, { state: { productId: productId } });
  };

  const fetchReviewable = async () => {
    const response = await reviewApi.getAbleReviewProduct();
    setReviewProduct(response.data);
  };

  useEffect(() => {
    fetchReviewable();
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
    <div>
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
              <span>{formatDate(product.orderDate)} 구매</span>
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
                onClick={() => goToReview(product.productId)}
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

export default Reviewable;
