/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styled from "styled-components";
import Logo from "components/commons/Logo";
import SearchPath from "assets/images/icons/Search.png";
import HeartPath from "assets/images/icons/Heart.png";
import CartPath from "assets/images/icons/Cart.png";
import UserPath from "assets/images/icons/User.png";
import MenuPath from "assets/images/icons/Menu.png";
interface Props {
  overlapGroupClassName: string;
  divClassName: string;
}

const StyledTopNav = styled.nav`
  margin-top: 3rem;

  ${({ theme }) => theme.media.mobile`
    margin-top: 1rem;
    justify-content: center;
  `}

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

    @media screen and (max-width: 1510px) {
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
  }
`;

const StyledSearch = styled.div.attrs({ className: "search" })`
  position: relative;
  display: inline-block;
  input#search {
    height: 55px;
    border: 1px solid;
    border-radius: 10px;
    padding: 0 3rem;
    ${({ theme }) => theme.media.desktop`        
        width: 706px;
        font-size: 1rem;
    `}
    ${({ theme }) => theme.media.tablet`
        width: 500px;
        font-size: 0.8rem;
    `}
    ${({ theme }) => theme.media.mobile`
        width: 320px;
        font-size: 0.8rem;
    `}
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 6px;
    left: 3px;
  }
`;

const StyledIconList = styled.div.attrs({ className: "icons" })`
  display: inline-flex;
  gap: 2rem;
  align-items: center;
`;

const StyledIcon = styled.div`
  positon: absolute;
  img {
    width: 24px;
    height: 24px;
    ${({ theme }) => theme.media.mobile`
      width: 20px;
      height: 20px;
    `}
  }
  span {
    font-size: 1rem;
    ${({ theme }) => theme.media.mobile`
      font-size: 0.8rem;
    `}
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMenus = styled.div.attrs({ className: "menus" })`
  display: flex;
  gap: 2.5rem;
  width: 706px;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet`
        width: 500px;
  `}

  ${({ theme }) => theme.media.mobile`
    gap: 0.5rem;
    width: 320px
  `};
`;

const Menu = styled.div`
  display: flex; /* Flex 컨테이너 설정 */
  align-items: center; /* 세로 방향으로 중앙 정렬 */
  gap: 0.5rem; /* 아이콘과 텍스트 사이의 간격 설정 */
  font-size: 1.25rem;
  font-weight: 800;
  ${({ theme }) => theme.media.tablet`
        font-size: 0.8rem;
  `}

  ${({ theme }) => theme.media.mobile`
    font-size: 0.8rem;
    gap: 0.25rem;
  `}

  img {
    display: inline;
    width: 18px;
    height: 18px;
  }
`;

// const StyledCnt = styled.div`
//   height: 16px;
//   width: 16px;
//   background: orange;
//   border-radius: 50%;
//   span {
//     font-size: 10px;
//     color: white;
//     text-align: center;
//     margin: auto;
//   }
// `;

export const TopNav = ({ overlapGroupClassName, divClassName }: Props): JSX.Element => {
  return (
    <StyledTopNav>
      <div className="frame">
        {/* <div className="div"> */}
        <Logo />
        <StyledSearch>
          <label htmlFor="search">
            <img src={SearchPath} alt="검색 아이콘" />
            <input id="search" type="text" placeholder="지금 먹고싶은 재료를 검색하세요!" />
          </label>
        </StyledSearch>
        <StyledIconList>
          <StyledIcon>
            <img src={HeartPath} alt="찜 아이콘" />
            <span>찜 목록</span>
          </StyledIcon>
          <StyledIcon>
            <img src={CartPath} alt="장바구니 아이콘" />
            <span>장바구니</span>
            {/* <StyledCnt>
                <span>20</span>
              </StyledCnt> */}
          </StyledIcon>
          <StyledIcon>
            <img src={UserPath} alt="마이페이지 아이콘" />
            <span>마이페이지</span>
          </StyledIcon>
        </StyledIconList>
        {/* </div> */}
        <StyledMenus>
          <Menu>
            <img src={MenuPath} alt="메뉴 아이콘" />
            전체상품
          </Menu>
          <Menu>밀킷 추천</Menu>
          <Menu>오븐</Menu>
          <Menu>이벤트</Menu>
          <Menu>베스트</Menu>
          <Menu>할인 중</Menu>
        </StyledMenus>
      </div>
    </StyledTopNav>
  );
};

export default TopNav;
