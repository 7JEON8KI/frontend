/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Layout, RecommendProduct } from "components/mealkeat";
import { ProductMealkeatRequest, ProductResponseDTO } from "models/mealkeat/ProductModels";
import productApi from "apis/productApi";
import { CenteredDiv, HighlightedText, MainText, VerticalCenterDiv } from "./PageMealkeat";
import styled from "styled-components";
import scrollToTop from "utils/scrollToTop";
import { useNavigate, useLocation } from "react-router-dom";
import formatCurrency from "utils/formatCurrency";

export const MoreProductsButton = styled.button.attrs({ type: "button" })`
  width: 245px;
  height: 48px;
  border: solid 1px #fd6f21;
  padding: 12px 50px;
  margin: 34px auto;
  display: block;
  color: #fd6f21;
  font-weight: bold;
  background-color: transparent; // 배경색을 명시적으로 설정하지 않았으므로, 필요에 따라 추가
  cursor: pointer; // 버튼에 마우스 오버 시 커서 변경 추가
`;

export const GoProductButton = styled.button.attrs({ type: "button" })`
  width: 245px;
  height: 48px;
  padding: 12px 50px;
  display: block;
  color: #ffffff;
  font-weight: bold;
  background-color: #fd6f21;
`;

const PageMealkeatResult: React.FC = () => {
  const location = useLocation();
  const searchRequest = location?.state;
  const navigate = useNavigate();
  const [recommendProduct, setRecommendProduct] = React.useState<ProductResponseDTO[]>([]);

  const getRecommendProduct = async () => {
    const fetchData = await productApi.getProductsMealkeatRecommend({ ...searchRequest } as ProductMealkeatRequest);
    setRecommendProduct(fetchData.data);
  };

  useEffect(() => {
    getRecommendProduct();
  }, []);

  return (
    <Layout>
      <CenteredDiv>
        <VerticalCenterDiv>
          <MainText>
            맛있는<HighlightedText>선택</HighlightedText>, 나만의
            <HighlightedText>기준</HighlightedText>
          </MainText>
        </VerticalCenterDiv>
      </CenteredDiv>

      <p
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          margin: "0 auto 5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {recommendProduct.length > 0 ? (
          <>고객님의 입맛에 맞는 밀킷입니다</>
        ) : (
          <>
            죄송합니다
            <br />
            고객님의 취향에 맞는 밀킷을 찾지 못했습니다
          </>
        )}
      </p>

      {recommendProduct.length > 0 &&
        recommendProduct
          .filter((_, idx) => idx === 0)
          .map((product, index) => (
            <div
              key={product.productId}
              style={{
                width: "1500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px",
              }}
            >
              <div>
                <img
                  style={{ width: "620px", height: "620px" }}
                  alt=""
                  src={product.thumbnailImageUrl}
                  draggable={false}
                />
              </div>
              <div
                style={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  width: "600px",
                  gap: "2rem",
                  alignItems: "start",
                }}
              >
                <p style={{ fontSize: "40px", fontWeight: "bold" }}>{product.productName}</p>
                <p
                  style={{ fontSize: "30px", fontWeight: "bold" }}
                >{`${formatCurrency({ amount: product.price, locale: "ko-KR" })}원`}</p>
                <GoProductButton
                  onClick={() => {
                    scrollToTop({});
                    navigate(`/detail/${product.productId}`);
                  }}
                  title="클릭 시 해당 상품 페이지로 이동"
                >
                  해당 상품 보러가기
                </GoProductButton>
              </div>
            </div>
          ))}
      {recommendProduct.length > 1 && (
        <div
          style={{
            width: "1320px",
            margin: "60px auto",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            paddingBottom: "80px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "2rem" }}>관련 밀킷</span>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
            {recommendProduct
              .filter((_, idx) => idx !== 0 && idx < 6)
              .map((product, index) => (
                <RecommendProduct key={product.productId} product={product} />
              ))}
          </div>
        </div>
      )}

      {recommendProduct.length > 0 ? (
        <MoreProductsButton
          onClick={() => {
            scrollToTop({});
            navigate("/list");
          }}
          title="클릭 시 전체 상품 페이지로 이동"
        >
          더 많은 상품 보러가기
        </MoreProductsButton>
      ) : (
        <MoreProductsButton
          onClick={() => {
            scrollToTop({});
            navigate(-1);
          }}
          title="클릭 시 이전 밀킷 추천 페이지로 이동"
        >
          다시 추천 받기
        </MoreProductsButton>
      )}
    </Layout>
  );
};

export default PageMealkeatResult;
