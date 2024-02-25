import React from "react";
import { Logo } from "components/mealkeat";
import SearchPath from "assets/images/icons/Search.png";
import HeartPath from "assets/images/icons/Heart.png";
import CartPath from "assets/images/icons/Cart.png";
import UserPath from "assets/images/icons/User.png";
import MenuPath from "assets/images/icons/Menu.png";
import { StyledHeader, StyledSearch, StyledIconList, StyledIcon, StyledTopNav, NavMenu } from "./Header.style";
import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
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
          <StyledIcon onClick={() => navigate("/like")}>
            <img src={HeartPath} alt="찜 아이콘" />
            <span>찜 목록</span>
          </StyledIcon>
          <StyledIcon onClick={() => navigate("/cart")}>
            <img src={CartPath} alt="장바구니 아이콘" />
            <span>장바구니</span>
            {/* <StyledCnt>
                <span>20</span>
              </StyledCnt> */}
          </StyledIcon>
          <StyledIcon onClick={() => navigate("/mypage")}>
            <img src={UserPath} alt="마이페이지 아이콘" />
            <span>마이페이지</span>
          </StyledIcon>
        </StyledIconList>
        <StyledTopNav>
          <NavMenu title="클릭 시 전체상품 페이지로 이동" onClick={() => navigate("/list")}>
            <img src={MenuPath} alt="메뉴 아이콘" />
            전체상품
          </NavMenu>
          <NavMenu title="클릭 시 밀킷 추천 페이지로 이동" onClick={() => navigate("/recommand")}>
            밀킷 추천
          </NavMenu>
          <NavMenu title="클릭 시 오븐 페이지로 이동" onClick={() => navigate("/oven")}>
            오븐
          </NavMenu>
          <NavMenu title="클릭 시 이벤트 페이지로 이동" onClick={() => navigate("/event")}>
            이벤트
          </NavMenu>
          <NavMenu title="클릭 시 베스트 페이지로 이동" onClick={() => navigate("/best")}>
            베스트
          </NavMenu>
          <NavMenu title="클릭 시 할인 중 페이지로 이동" onClick={() => navigate("/discount")}>
            할인 중
          </NavMenu>
        </StyledTopNav>
      </div>
    </StyledHeader>
  );
};

export default Header;
