import React from "react";
import Logo from "components/commons/Logo";
import SearchPath from "assets/images/icons/Search.png";
import HeartPath from "assets/images/icons/Heart.png";
import CartPath from "assets/images/icons/Cart.png";
import UserPath from "assets/images/icons/User.png";
import MenuPath from "assets/images/icons/Menu.png";
import {
  StyledHeader,
  StyledSearch,
  StyledIconList,
  StyledIcon,
  StyledTopNav,
  NavMenu,
} from "styles/components/commons/Header.style";

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <div className="frame">
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
        <StyledTopNav>
          <NavMenu>
            <img src={MenuPath} alt="메뉴 아이콘" />
            전체상품
          </NavMenu>
          <NavMenu>밀킷 추천</NavMenu>
          <NavMenu>오븐</NavMenu>
          <NavMenu>이벤트</NavMenu>
          <NavMenu>베스트</NavMenu>
          <NavMenu>할인 중</NavMenu>
        </StyledTopNav>
      </div>
    </StyledHeader>
  );
};

export default Header;
