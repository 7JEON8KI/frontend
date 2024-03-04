/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Layout, RecommandProduct } from "components/mealkeat";
import { ProductRecommandResponse } from "models/mealkeat/RecommandModels";
import recommandApi from "apis/recommandApi";
import { ProductResponseDTO } from "models/mealkeat/ProductModels";
import { CenteredDiv, HighlightedText, MainText, VerticalCenterDiv } from "./PageMealkeat";
import styled from "styled-components";
import scrollToTop from "utils/scrollToTop";
import { useNavigate } from "react-router-dom";

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

const PageMealkeatResult: React.FC = () => {
  const navigate = useNavigate();
  // const [recommandProduct, setRecommandProduct] = React.useState<ProductRecommandResponse[]>([]);

  // const getRecommandProduct = async () => {
  //   const recommand = await recommandApi.getRecommendations({
  //     productId: 401,
  //     productMainImage:
  //       "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
  //     productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
  //   });
  //   setRecommandProduct(recommand.data);
  // };
  const recommandProduct: ProductResponseDTO[] = [
    {
      amount: 100,
      calorie: 500,
      createdAt: [2024, 3, 3, 11, 45, 48],
      discountRate: 0,
      isLike: 0,
      modifiedAt: [2024, 3, 3, 11, 45, 48],
      price: 26000,
      productDetail:
        "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8fe6a029-d900-11ee-b8ac-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8ffa2cd9-d900-11ee-86bb-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90176a7d-d900-11ee-a1d9-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_902c583e-d900-11ee-92f6-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90fd1549-d900-11ee-9b6b-ac198ebc401d.jpg'",
      productId: 401,
      productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
      productSubName: "상품상세설명 참조",
      productType: "밀키트",
      rn: 0,
      stock: 100,
      storage: "냉장",
      thumbnailImageUrl:
        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
    },
    {
      amount: 100,
      calorie: 500,
      createdAt: [2024, 3, 3, 11, 45, 48],
      discountRate: 0,
      isLike: 0,
      modifiedAt: [2024, 3, 3, 11, 45, 48],
      price: 26000,
      productDetail:
        "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8fe6a029-d900-11ee-b8ac-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8ffa2cd9-d900-11ee-86bb-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90176a7d-d900-11ee-a1d9-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_902c583e-d900-11ee-92f6-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90fd1549-d900-11ee-9b6b-ac198ebc401d.jpg'",
      productId: 401,
      productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
      productSubName: "상품상세설명 참조",
      productType: "밀키트",
      rn: 0,
      stock: 100,
      storage: "냉장",
      thumbnailImageUrl:
        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
    },
    {
      amount: 100,
      calorie: 500,
      createdAt: [2024, 3, 3, 11, 45, 48],
      discountRate: 0,
      isLike: 0,
      modifiedAt: [2024, 3, 3, 11, 45, 48],
      price: 26000,
      productDetail:
        "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8fe6a029-d900-11ee-b8ac-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8ffa2cd9-d900-11ee-86bb-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90176a7d-d900-11ee-a1d9-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_902c583e-d900-11ee-92f6-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90fd1549-d900-11ee-9b6b-ac198ebc401d.jpg'",
      productId: 401,
      productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
      productSubName: "상품상세설명 참조",
      productType: "밀키트",
      rn: 0,
      stock: 100,
      storage: "냉장",
      thumbnailImageUrl:
        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
    },
    {
      amount: 100,
      calorie: 500,
      createdAt: [2024, 3, 3, 11, 45, 48],
      discountRate: 0,
      isLike: 0,
      modifiedAt: [2024, 3, 3, 11, 45, 48],
      price: 26000,
      productDetail:
        "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8fe6a029-d900-11ee-b8ac-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8ffa2cd9-d900-11ee-86bb-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90176a7d-d900-11ee-a1d9-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_902c583e-d900-11ee-92f6-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90fd1549-d900-11ee-9b6b-ac198ebc401d.jpg'",
      productId: 401,
      productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
      productSubName: "상품상세설명 참조",
      productType: "밀키트",
      rn: 0,
      stock: 100,
      storage: "냉장",
      thumbnailImageUrl:
        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
    },
    {
      amount: 100,
      calorie: 500,
      createdAt: [2024, 3, 3, 11, 45, 48],
      discountRate: 0,
      isLike: 0,
      modifiedAt: [2024, 3, 3, 11, 45, 48],
      price: 26000,
      productDetail:
        "'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8fe6a029-d900-11ee-b8ac-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_8ffa2cd9-d900-11ee-86bb-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90176a7d-d900-11ee-a1d9-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_902c583e-d900-11ee-92f6-ac198ebc401d.jpg', 'https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/detail/101_90fd1549-d900-11ee-9b6b-ac198ebc401d.jpg'",
      productId: 401,
      productName: "[지투지샵] 마이무 무뼈닭발 500g 2팩",
      productSubName: "상품상세설명 참조",
      productType: "밀키트",
      rn: 0,
      stock: 100,
      storage: "냉장",
      thumbnailImageUrl:
        "https://mealkeat-s3.s3.ap-northeast-2.amazonaws.com/mealkeat/products/thumbnail/101_8f6270bf-d900-11ee-ae88-ac198ebc401d.jpg",
    },
  ];

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
        추천 결과입니다!
      </p>
      <div
        style={{
          width: "1500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <div>
          <img style={{ width: "620px", height: "620px" }} alt="" src={recommandProduct[0].thumbnailImageUrl} />
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
          <p style={{ fontSize: "30px" }}>감초로 만든 육수!</p>
          <p style={{ fontSize: "60px", fontWeight: "bold" }}>{recommandProduct[0].productName}</p>
          <p style={{ fontSize: "24px" }}>
            {`40년간 3대째 이어져 내려오는 닭 요리 전문점으로 유명한 '장수닭한마리'의 닭개장을 소개해요. 엄나무, 황기 등의
            한약재를 넣어 푹 끓인 육수에 쫄깃한 국산 닭고기와 고사리를 푸짐하게 넣어 깊은 맛을 낸 닭개장을 집에서
            간편하게 즐겨보세요.`}
          </p>
        </div>
      </div>
      {recommandProduct.length > 0 && (
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
            {recommandProduct.length > 0 &&
              recommandProduct.slice(1, 5).map((product, index) => <RecommandProduct key={index} product={product} />)}
          </div>
        </div>
      )}
      <MoreProductsButton
        onClick={() => {
          scrollToTop({});
          navigate("/list");
        }}
        title="클릭 시 전체 상품 페이지로 이동"
      >
        더 많은 상품 보러가기
      </MoreProductsButton>
    </Layout>
  );
};

export default PageMealkeatResult;
