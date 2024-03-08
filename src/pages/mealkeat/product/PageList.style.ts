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

export const EmptyLeftDiv = styled.div`
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

interface StyledMenuButtonProps {
  $selected?: boolean;
}

// 상품 메뉴 버튼 스타일
export const StyledMenuButton = styled.button.attrs<StyledMenuButtonProps>({ type: "button" })`
  display: inline-block;
  padding: 0 1rem;
  font-size: 0.875rem;
  border-right: 1px solid #dfdfdf;
  font-weight: ${({ $selected }) => ($selected ? "bold" : "normal")};
  color: ${({ $selected }) => ($selected ? "#fd6f21" : "black")};
`;

// 상품 메뉴 이미지 스타일
export const StyledMenuImage = styled.img.attrs({ draggable: false })`
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

interface ThemeButtonProps {
  $selected?: boolean;
}
// 테마 버튼
export const ThemeButton = styled.button.attrs({ type: "button" })<ThemeButtonProps>`
  width: 100px;
  height: 50px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 5px;
  transition: background-color 0.5s;
  font-weight: bold;
  color: black;
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.mainColor};
    border: none;
  }

  ${({ $selected, theme }) =>
    $selected &&
    `
    color: white;
    background-color: ${theme.colors.mainColor};
    border: none;
  `}
`;
