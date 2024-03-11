import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import scrollToTop from "utils/scrollToTop";
import { useSelector } from "react-redux";
import { RootState } from "store";

export const StyledSidebarDiv = styled.div`
  min-height: 100vh;
  width: 200px;
  ${({ theme }) => theme.media.xxl`
    display: none;
  `}
`;

export const StyledSidebarAside = styled.aside`
  width: 200px;
  display: flex;
  flex-direction: column;
  position: sticky;
  background: lightgray;
  top: 100px;
`;

export const StyledInfoDivFirst = styled.div`
  text-align: center;
  padding: 10px 10;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 50px;
`;
export const StyledInfoButton = styled.button.attrs({ type: "button" })`
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  font-size: 1rem;
  height: 60px;
  margin: auto;
  display: flex;
  align-items: center;
  border-top: 1px solid #c3c6c9;
  justify-content: center;
`;

export const StyledInfoDiv = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px 10px;
  font-size: 1rem;
  height: 60px;
  margin: auto;
  display: flex;
  align-items: center;
  border-top: 1px solid #c3c6c9;
  justify-content: center;
`;

export const StyledScrollToTop = styled.button.attrs({ type: "button" })`
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  background: white;
  font-size: 1.75rem;
  font-weight: bold;
  bottom: -70px;
  border-radius: 50%;
`;

const ProductSidebar = () => {
  const recentProduct = useSelector((state: RootState) => state.recent);
  const navigate = useNavigate();

  return (
    <StyledSidebarDiv>
      <StyledSidebarAside>
        <StyledInfoDivFirst>
          <div style={{ width: "90%", height: "200px", background: "white", margin: "15px auto" }}>
            {recentProduct.src !== "" && <img src={recentProduct.src} alt={recentProduct.title} />}
          </div>
          <p style={{ width: "80%", margin: "auto" }}>{recentProduct.title}</p>
        </StyledInfoDivFirst>
        <StyledInfoButton
          onClick={() => {
            if (recentProduct.productId === -1) return;
            navigate(`/detail/${recentProduct.productId}`);
            scrollToTop({});
          }}
        >
          최근 본 상품 &gt;
        </StyledInfoButton>
        <StyledInfoButton
          onClick={() => {
            navigate("/mypage/like");
            scrollToTop({});
          }}
        >
          찜한 상품 &gt;
        </StyledInfoButton>
        <StyledInfoDiv>1800-0700</StyledInfoDiv>
        <StyledScrollToTop title="클릭 시 상단으로 이동" onClick={() => scrollToTop({ smooth: true })}>
          &uarr;
        </StyledScrollToTop>
      </StyledSidebarAside>
    </StyledSidebarDiv>
  );
};

export default ProductSidebar;
