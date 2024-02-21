import styled from "styled-components";

export const StyledHeader = styled.header`
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    margin-top: 1rem;
    justify-content: center;
  }

  .frame {
    width: 90%;
    margin: auto;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 2fr 8fr 2.25fr; /* 가로 비율 설정 */
    grid-template-rows: auto auto; /* 세로 비율 설정, 각 행의 높이는 내용에 따라 자동으로 조정됨 */
    gap: 2.5rem;
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

export const StyledSearch = styled.div.attrs({ className: "search" })`
  position: relative;
  display: inline-block;
  input#search {
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
  img {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 6px;
    left: 3px;
  }
`;

export const StyledIconList = styled.div.attrs({ className: "icons" })`
  display: inline-flex;
  gap: 2rem;
  align-items: center;
`;

export const StyledIcon = styled.div`
  positon: absolute;
  img {
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 1rem;
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
`;

export const StyledTopNav = styled.nav.attrs({ className: "menus" })`
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

export const NavMenu = styled.div`
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
