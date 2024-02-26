import { Layout } from "components/mealkeat";
import React from "react";
import {
  StyledListGrid,
  StyledSidebarDiv,
  StyledMain,
  StyledSidebarAside,
  StyledInfoDivFirst,
  StyledInfoDiv,
  StyledScrollToTop,
} from "./PageList.style";
import scrollToTop from "utils/scrollToTop";

const PageDetail: React.FC = () => {
  return (
    <Layout>
      <StyledListGrid>
        <StyledSidebarDiv />
        <StyledMain>
          <div style={{ width: "1320px", height: "900px", background: "gray" }}></div>
          <div style={{ width: "1320px", height: "250px", background: "gray", marginTop: "20px" }}></div>
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}>상품 상세 설명</span>
          <img
            src="https://via.placeholder.com/640x2770"
            alt="대체 텍스트가 들어가야합니다~~~!!"
            style={{ width: "640px", height: "2770px", margin: "auto" }}
          />
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
            <StyledScrollToTop title="클릭 시 상단으로 이동" onClick={() => scrollToTop({ smooth: true })}>
              &uarr;
            </StyledScrollToTop>
          </StyledSidebarAside>
        </StyledSidebarDiv>
      </StyledListGrid>
    </Layout>
  );
};

export default PageDetail;
