import React, { useState } from "react";
import { Title } from "./PageMypageLike.style";
import Reviewable from "./Reviewable";
import MyReview from "./MyReview";
import { useLocation } from "react-router-dom";

const PageMypageReview: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"reviewable" | "myReview">(
    location.state ? location.state.activeTab : "reviewable",
  );

  // 리뷰 가능한 상품 탭을 활성화합니다.
  const showReviewable = () => {
    setActiveTab("reviewable");
  };
  // 내 리뷰 탭을 활성화합니다.
  const showMyReview = () => {
    setActiveTab("myReview");
  };

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
              backgroundColor: activeTab === "reviewable" ? "#fd6f21" : "transparent",
              color: activeTab === "reviewable" ? "white" : "#fd6f21",
            }}
            onClick={showReviewable}
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
              backgroundColor: activeTab === "myReview" ? "#fd6f21" : "transparent",
              color: activeTab === "myReview" ? "white" : "#fd6f21",
            }}
            onClick={showMyReview}
          >
            작성한 리뷰
          </button>
        </div>
        <div>
          {activeTab === "reviewable" && <Reviewable />}
          {activeTab === "myReview" && <MyReview />}
        </div>
      </section>
    </>
  );
};

export default PageMypageReview;
