import styled, { css } from "styled-components";

export const Header = styled.header.attrs({ id: "header" })`
  margin-top: 3rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
    justify-content: center;
  }

  .frame {
    width: 80%;
    margin: auto;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 2fr 8fr 2.5fr; /* 가로 비율 설정 */
    grid-template-rows: auto auto; /* 세로 비율 설정, 각 행의 높이는 내용에 따라 자동으로 조정됨 */
    gap: 2.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding-bottom: 30px;
    grid-template-areas:
      "logo search icons"
      ". menus .";

    .logo {
      grid-area: logo;
      justify-self: start;
    }

    .search {
      grid-area: search;
    }

    .icons {
      grid-area: icons;
      justify-self: end;
    }

    .menus {
      grid-area: menus;
    }

    ${({ theme }) => theme.media.xxl`
        gap: 1rem;
        grid-template-rows: repeat(4, auto); /* 세로 비율 설정, 각 행의 높이는 내용에 따라 자동으로 조정됨 */
        grid-template-columns: 1fr; /* 가로 비율 설정 */
        grid-template-areas:
          "logo"
          "icons"
          "search"
          "menus";
        .logo,
        .icons {
          justify-self: center;
        }
      }
    }`}
`;

export const Search = styled.div.attrs({ className: "search" })`
  display: inline-block;
  & label {
    position: relative;
    display: flex;
    align-items: center;
  }
  & input#search {
    height: 55px;
    border: 1px solid;
    border-radius: 10px;
    padding: 0 3rem;
    width: 706px;
    font-size: 1rem;
    ${({ theme }) => theme.media.tablet`
        width: 500px;
        font-size: 0.8rem;
    `}
    @media only screen and (max-width: 600px) {
      width: 320px;
      font-size: 0.8rem;
    }
  }
  & img {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 6px;
    left: 3px;
  }
`;

export const IconList = styled.div.attrs({ className: "icons" })`
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;
interface IconProps {
  $amount?: number;
}

export const Icon = styled.button.attrs({ type: "button" })<IconProps>`
  positon: relative;
  img {
    width: 24px;
    height: 24px;
  }
  span {
    margin-top: ${({ theme }) => theme.size.lg};
  }
  @media only screen and (max-width: 600px) {
    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 0.8rem;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ $amount }) =>
    $amount &&
    $amount > 0 &&
    css`
      position: relative;
      &::after {
        content: "${$amount}";
        position: absolute;
        width: 40px;
        height: 20px;
        border: 1px solid ${({ theme }) => theme.colors.mainColor};
        background: ${({ theme }) => theme.colors.mainColor};
        color: white;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -25px;
      }
    `};
`;

export const TopNav = styled.nav.attrs({ className: "menus" })`
  display: flex;
  gap: 2.5rem;
  width: 706px;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet`
        width: 500px;
  `}

  @media only screen and (max-width: 600px) {
    gap: 0.5rem;
    width: 320px;
  }
`;

export const NavMenu = styled.button.attrs({ type: "button" })`
  display: flex; /* Flex 컨테이너 설정 */
  align-items: center; /* 세로 방향으로 중앙 정렬 */
  gap: 0.5rem; /* 아이콘과 텍스트 사이의 간격 설정 */
  font-size: 1.25rem;
  font-weight: 800;
  ${({ theme }) => theme.media.tablet`
        font-size: 0.8rem;
  `}

  @media only screen and (max-width: 600px) {
    font-size: 0.8rem;
    gap: 0.25rem;
  }

  img {
    display: inline;
    width: 18px;
    height: 18px;
  }
`;

export const ImageSearchBtn = styled.button.attrs({ type: "button" })`
  position: absolute;
  right: 30px;
  background-color: ${({ theme }) => theme.colors.pointSubColor2}; /* 버튼 배경 색 */
  border: none; /* 테두리 없음 */
  color: white; /* 텍스트 색 */
  padding: 0.3rem 0.9rem; /* 내부 여백 */
  text-decoration: none; /* 텍스트 밑줄 없음 */
  display: inline-flex; /* 인라인 블록 요소로 표시 */
  font-size: 1rem; /* 폰트 크기 */
  margin: 4px 2px; /* 마진 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
  border-radius: 8px; /* 버튼 모서리 둥글게 */
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.pointSubColor}; /* 호버 상태 배경 색 */
    font-weight: bold;
  }

  & > img {
    position: static;
  }
`;
