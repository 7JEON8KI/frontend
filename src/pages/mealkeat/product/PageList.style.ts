import styled from "styled-components";

export const StyledListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;

  ${({ theme }) => theme.media.xxl`
    display: block;
    width: 100%;
    margin: auto;
  `}
`;

export const StyledSidebarDiv = styled.div`
  min-height: 100vh;
  width: 200px;
  ${({ theme }) => theme.media.xxl`
    display: none;
  `}
`;

export const StyledMain = styled.main`
  display: inline-block;
  margin: auto;
  min-height: 100vh;
  ${({ theme }) => theme.media.xxl`
    margin: auto;
    display: block;
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
  width: 80px;
  height: 80px;
  border: 1px solid black;
  background: white;
  font-size: 2rem;
  bottom: -200px;
  border-radius: 50%;
`;

export const StyledMenuNav = styled.nav`
  width: 1290px;
  margin: 40px auto;
`;

export const StyledMenuTitle = styled.p`
  margin: auto;
  font-size: 30px;
  text-align: center;
  margin-bottom: 60px;
`;

export const StyledMenuInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid #dfdfdf;
  margin: auto;
`;

// 상품 메뉴 버튼 스타일
export const StyledMenuButton = styled.button.attrs({ type: "button" })`
  display: inline-block;
  padding: 0 1rem;
  font-size: 0.875rem;
  border-right: 1px solid #dfdfdf;
`;

// 상품 메뉴 이미지 스타일
export const StyledMenuImage = styled.img`
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
`;

// 상품 갯수 표시 스타일
export const StyledItemCount = styled.span`
  padding: 1.5rem;
  fontsize: 0.875rem;
  vertical-align: middle;
`;

// 상품 그리드 스타일
export const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 50px 0;
  margintop: 60px;
`;

// 상품 정보 디바이더 스타일
export const StyledProductInfoDivider = styled.div`
  padding: 1rem 0;
`;
