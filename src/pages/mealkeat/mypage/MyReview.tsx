import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reviewApi from "apis/reviewApi";

interface Review {
  reviewId: number;
  productId: number;
  memberNickname: string;
  reviewTitle: string;
  reviewContent: string;
  reviewImageUrl: string;
  reviewStar: string;
  modifiedAt: string;
  thumbnailImageUrl: string;
  productName: string;
}

const MyReview: React.FC = () => {
  const [reviewProduct, setReviewProduct] = useState<Review[]>([]);

  const navigate = useNavigate();
  const goToReview = (productId: number) => {
    navigate(`../review/${productId}`, { state: { productId: productId } });
  };
  const fetchReviewable = async () => {
    const response = await reviewApi.getReviewsByMemberId();
    setReviewProduct(response.data);
  };

  const deleteReview = async (review: Review) => {
    const ReviewRequestDto = {
      productId: review.productId,
      reviewTitle: review.reviewTitle,
      reviewContent: review.reviewContent,
      reviewImageUrl: review.reviewImageUrl,
      reviewStar: review.reviewStar,
    };
    await reviewApi.deleteReview(ReviewRequestDto).then(() => fetchReviewable());
  };

  useEffect(() => {
    fetchReviewable();
  }, []);

  return (
    <div
      className="review-list"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem 1rem",
      }}
    >
      {reviewProduct.length > 0 ? (
        reviewProduct.map(review => (
          <>
            <div key={review.reviewId}>
              <div
                style={{
                  height: "210px",
                  display: "flex",
                  gap: "1rem",
                  padding: "1.5rem 1rem",
                  borderTop: "1px solid #c3c6c9",
                  justifyContent: "space-between",
                }}
              >
                <img draggable={false} src={review.thumbnailImageUrl} style={{ width: "150px", height: "150px" }} />
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
                  <span>{review.productName}</span>
                  <span>{review.modifiedAt}</span>
                  <span
                    className="review-rating"
                    style={{
                      fontSize: "30px",
                    }}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        style={{
                          color: index < parseInt(review.reviewStar) ? "#FD6F21" : "grey",
                        }}
                      >
                        ♥
                      </span>
                    ))}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#fd6f21",
                    }}
                    onClick={() => goToReview(review.productId)}
                  >
                    수정
                  </span>
                  <span
                    style={{
                      color: "#d0d0d0",
                    }}
                  >
                    |
                  </span>
                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#fd6f21",
                    }}
                    onClick={() => deleteReview(review)}
                  >
                    삭제
                  </span>
                </div>
              </div>
              <div
                className="review-item"
                style={{
                  border: "1px solid #ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="review-image-container"
                  style={{
                    width: "500px",
                    overflow: "hidden",
                    margin: "2rem",
                  }}
                >
                  <img
                    draggable={false}
                    src={review.reviewImageUrl}
                    alt={review.reviewTitle}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="review-image"
                  />
                </div>
                <div
                  className="review-content"
                  style={{
                    width: "700px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    className="review-text"
                    style={{
                      fontSize: "1.2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {review.reviewContent}
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
