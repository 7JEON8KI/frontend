import React, { useEffect, useState, useRef } from "react";
import { Title } from "./PageMypageLike.style";
import { LuImagePlus } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import reviewApi from "apis/reviewApi";
import productApi from "apis/productApi";
import { AxiosResponse } from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Product {
  productId: number;
  thumbnailImageUrl: string;
  productName: number;
}

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

interface CustomAxiosResponse extends AxiosResponse {
  data: Review;
  statusCode?: number;
  message?: string;
}

const ModalReview: React.FC = () => {
  const [reviewProduct, setReviewProduct] = useState<Review>();
  const [product, setProduct] = useState<Product>();
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewExists, setReviewExists] = useState<boolean>(false);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("multipartFile", file);
      await reviewApi.uploadImage(formData).then(response => setImageUrl(response.data));

      // 입력 값을 리셋
      if (event.target && event.target.files) {
        event.target.value = "";
      }
    }
  };

  const location = useLocation();
  const productId = location.state.productId;
  const navigate = useNavigate();
  const goToReview = () => {
    navigate("../review", { state: { activeTab: "myReview" } });
  };
  const fetchReview = async () => {
    const responseProduct = await productApi.getProductDetail({ productId });
    const responseReview = await reviewApi.getProductReviewByMemberId(productId);

    setProduct(responseProduct.data);
    if ((responseReview as CustomAxiosResponse).statusCode === 200) {
      setReviewExists(true);
      setReviewProduct(responseReview.data);

      // 리뷰가 존재하는 경우에만 초기 리뷰 점수를 설정
      if (responseReview.data?.reviewStar) {
        setReviewScore(parseInt(responseReview.data.reviewStar));
        setReviewContent(responseReview.data.reviewContent);
        setImageUrl(responseReview.data.reviewImageUrl);
      }
    } else if ((responseReview as CustomAxiosResponse).statusCode === 404) {
      setReviewExists(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleHeartClick = (score: number) => {
    setReviewScore(score);
  };

  const handleReviewContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const renderHearts = () => {
    const hearts = [];
    const selectedScore = reviewScore; // 리뷰가 수정될 때 사용자가 선택한 점수 또는 초기 리뷰 점수를 가져옴
    for (let i = 1; i <= 5; i++) {
      hearts.push(
        <span
          key={i}
          style={{
            cursor: "pointer",
            color: i <= selectedScore ? "#FD6F21" : "grey",
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

  const handleSaveReview = async () => {
    if (!product) {
      alert("Product information is missing.");
      return;
    }

    const reviewPayload = {
      reviewId: reviewProduct?.reviewId,
      productId: product.productId,
      reviewContent: reviewContent,
      reviewStar: reviewScore.toString(),
      reviewImageUrl: imageUrl,
      reviewTitle: product.productId + " 리뷰",
    };

    if (reviewExists) {
      // Update existing review
      console.log("update review");
      await reviewApi.updateReview(reviewPayload);
    } else {
      // Save new review
      console.log("save review");
      await reviewApi.saveReview(reviewPayload);
    }

    alert("리뷰가 성공적으로 처리되었습니다.");
    goToReview();
  };

  return (
    <>
      <Title>리뷰 등록</Title>
      <section style={{ border: "1px solid #f4f4f4", width: "90%", margin: "auto" }}>
        {product ? (
          <>
            <div
              style={{
                height: "210px",
                display: "flex",
                gap: "1rem",
                padding: "1.5rem 1rem",
                borderTop: "1px solid #d0d0d0",
                justifyContent: "space-between",
              }}
            >
              <img draggable={false} src={product!.thumbnailImageUrl} style={{ width: "150px", height: "150px" }} />
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
                <span>{product!.productName}</span>
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
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    margin: "10px",
                    border: "2px dashed #d0d0d0",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <LuImagePlus
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "10px",
                    }}
                  />
                </div>
                {imageUrl && (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img draggable={false} src={imageUrl} alt="Preview" style={{ maxWidth: "150px" }} />
                    <IoMdCloseCircleOutline
                      style={{
                        position: "absolute",
                        top: "-1rem",
                        right: "-1rem",
                        cursor: "pointer",
                        color: "#fd6f21",
                        fontSize: "24px",
                      }}
                      onClick={() => setImageUrl(null)}
                    />
                  </div>
                )}
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
                  value={reviewContent} // Bind textarea to reviewContent state
                  onChange={e => handleReviewContentChange(e)} // Update state on change
                  placeholder="리뷰를 작성해주세요."
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "10px",
                    margin: "10px",
                    border: "1px solid #d0d0d0",
                  }}
                />
              </div>
            </div>
            <button
              style={{
                width: "100%",
                height: "50px",
                padding: "10px",
                backgroundColor: "#fd6f21",
                color: "white",
                border: "none",
                fontSize: "20px",
              }}
              onClick={() => handleSaveReview()}
            >
              등록하기
            </button>
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
