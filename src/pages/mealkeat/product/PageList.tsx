import React from "react";
import { Layout, Product } from "components/mealkeat";
import except from "assets/images/icons/except.png";
import exceptClick from "assets/images/icons/except_click.png";
import {
  StyledListGrid,
  StyledSidebarDiv,
  StyledMain,
  StyledSidebarAside,
  StyledInfoDivFirst,
  StyledInfoDiv,
  StyledScrollToTop,
  StyledMenuDiv,
  StyledMenuTitle,
  StyledMenuInfo,
  StyledMenuButton,
  StyledMenuImage,
  StyledItemCount,
  StyledProductGrid,
  StyledProductInfoDivider,
} from "./PageList.style";
import scrollToTop from "utils/scrollToTop";

const PageList: React.FC = () => {
  const [clickExcept, setClickExcept] = React.useState<boolean>(false);
  const products = Array(12)
    .fill(0)
    .map((_, idx) => ({
      imageUrl: "https://via.placeholder.com/400x400",
      title: `${idx + 1}.[새벽시장] 맛있는 명인 손만두, 최대 한줄까지 작성 가능합니다.`,
      description:
        "내용입니다. 최대 한줄까지~~!! 한줄까지~~!! 한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!한줄까지~~!!",
      discount: "30%",
      price: "15,800원",
      originalPrice: "22,600원",
      soldOut: false, // 일시 품절 여부
    }));

  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <StyledMenuDiv className="topMenu">
            <StyledMenuTitle>전체상품</StyledMenuTitle>
            <StyledMenuInfo>
              <StyledItemCount>총 262건</StyledItemCount>
              <StyledProductInfoDivider>
                <StyledMenuButton onClick={() => setClickExcept(prev => !prev)}>
                  <StyledMenuImage src={clickExcept ? exceptClick : except} alt="" />
                  <span>품절 상품제외</span>
                </StyledMenuButton>
                <StyledMenuButton>최신상품</StyledMenuButton>
                <StyledMenuButton>낮은가격</StyledMenuButton>
                <StyledMenuButton>높은가격</StyledMenuButton>
                <StyledMenuButton style={{ borderRight: "none" }}>인기상품</StyledMenuButton>
              </StyledProductInfoDivider>
            </StyledMenuInfo>
            <StyledProductGrid>
              {products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </StyledProductGrid>
          </StyledMenuDiv>
        </StyledMain>
        <StyledSidebarDiv>
          <StyledSidebarAside>
            <StyledInfoDivFirst>
              <div style={{ width: "90%", height: "200px", background: "white", margin: "15px auto" }}></div>
              주문 시간 및<br /> 배송 안내
            </StyledInfoDivFirst>
            <StyledInfoDiv>최근 본 상품 &gt;</StyledInfoDiv>
            <StyledInfoDiv>찜한 상품 &gt;</StyledInfoDiv>
            <StyledInfoDiv>1800-0700</StyledInfoDiv>
            <StyledScrollToTop title="클릭 시 상단으로 이동" onClick={scrollToTop}>
              &uarr;
            </StyledScrollToTop>
          </StyledSidebarAside>
        </StyledSidebarDiv>
      </StyledListGrid>
    </Layout>
  );
};

export default PageList;
