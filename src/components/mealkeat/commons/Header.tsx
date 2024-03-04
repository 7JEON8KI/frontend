import React from "react";
import { Logo } from "components/mealkeat";
import SearchPath from "assets/images/icons/Search.png";
import HeartPath from "assets/images/icons/Heart.png";
import CartPath from "assets/images/icons/Cart.png";
import UserPath from "assets/images/icons/User.png";
import MypagePath from "assets/images/icons/Mypage.png";
import MenuPath from "assets/images/icons/Menu.png";
import { StyledHeader, StyledSearch, StyledIconList, StyledIcon, StyledTopNav, NavMenu } from "./Header.style";
import { useNavigate } from "react-router-dom";

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const [word, setWord] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (word.trim()) navigate("/search", { state: { searchWord: word.trim() } });
      else window.alert("검색어를 입력해주세요.");
    }
  };

  return (
    <StyledHeader>
      <div className="frame">
        <Logo />
        <StyledSearch>
          <label htmlFor="search">
            <img src={SearchPath} alt="검색 아이콘" />
            <input
              id="search"
              type="text"
              placeholder="지금 먹고싶은 재료를 검색하세요!"
              value={word}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </label>
        </StyledSearch>
        <StyledIconList>
          <StyledIcon onClick={() => navigate("/mypage/like")}>
            <img src={HeartPath} alt="찜 아이콘" />
            <span>찜 목록</span>
          </StyledIcon>
          <StyledIcon onClick={() => navigate("/cart")} $amount={3}>
            <img src={CartPath} alt="장바구니 아이콘" />
            <span>장바구니</span>
          </StyledIcon>
          <StyledIcon onClick={() => navigate("/login")}>
            <img src={UserPath} alt="로그인/로그아웃 아이콘" />
            <span>로그인</span>
          </StyledIcon>
          <StyledIcon onClick={() => navigate("/mypage/order")}>
            <img src={MypagePath} alt="마이페이지 아이콘" />
            <span>마이페이지</span>
          </StyledIcon>
        </StyledIconList>
        <StyledTopNav>
          <NavMenu title="클릭 시 전체상품 페이지로 이동" onClick={() => navigate("/list")}>
            <img src={MenuPath} alt="메뉴 아이콘" />
            전체상품
          </NavMenu>
          <NavMenu title="클릭 시 밀킷 추천 페이지로 이동" onClick={() => navigate("/recommend")}>
            밀킷 추천
          </NavMenu>
          <NavMenu title="클릭 시 와인 페이지로 이동" onClick={() => navigate("/wine")}>
            와인
          </NavMenu>
          {/* <NavMenu title="클릭 시 이벤트 페이지로 이동" onClick={() => navigate("/event")}>
            이벤트
          </NavMenu> */}
          <NavMenu title="클릭 시 테마별 페이지로 이동" onClick={() => navigate("/theme")}>
            테마별
          </NavMenu>
          <NavMenu title="클릭 시 베스트 페이지로 이동" onClick={() => navigate("/best")}>
            베스트
          </NavMenu>
        </StyledTopNav>
      </div>
    </StyledHeader>
  );
};

export default Header;
